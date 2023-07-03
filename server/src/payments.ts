import { stripe } from "./";
import { queryMemberBy } from "./airtable";
import { sendEmail } from "./email";
import { nanoid } from "nanoid";
const Qrcode = require("qrcode");

export async function createPaymentIntent(
  data: Array<any>,
  email: string,
  amount: number
) {
  const { member } = await queryMemberBy(["name"], [data[0].name]);
  const payment_intent = member?.fields?.payment_intent as string;

  const updatePaymentIntent = async (
    ID: string,
    paymentIntent: string,
    quantity: number
  ) => {
    const { member, table } = await queryMemberBy(["ID"], [ID]);
    table.update(member.id, {
      payment_intent: paymentIntent,
    });
  };

  const createNewIntent = async () => {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "gbp",
      amount: amount,
      metadata: { code: data[0].code, email: email },
    });

    data.forEach((x) => {
      updatePaymentIntent(x.ID, paymentIntent.id, x.quantity);
    });

    return {
      client_secret: paymentIntent.client_secret,
      amount: amount,
      id: paymentIntent.id,
    };
  };

  if (!payment_intent) return createNewIntent();
  const intent = await stripe.paymentIntents.retrieve(payment_intent);
  if (intent.amount !== amount) return createNewIntent();
  return {
    client_secret: intent.client_secret,
    amount,
  };
}

export async function updatePaymentComplete(id: string) {
  const intent = await stripe.paymentIntents.retrieve(id);
  const email = intent.metadata.email;
  if (intent.status === "succeeded") {
    const { member, table } = await queryMemberBy(["payment_intent"], [id]);
    const members = await table
      .select({
        filterByFormula: `{payment_intent} = '${id}'`,
      })
      .all();

    sendEmail(email, members.length);
    const updateMembers = async (member: any) => {
      if (!member) return null;

      const quantity = intent.amount / 100 / member.fields.price;
      await table.update(member.id, {
        remaining: member.fields.remaining - quantity,
        purchased: member.fields.purchased + quantity,
        payment_intent: "",
        // quantity: 1,
      });
    };
    members.forEach((member) => {
      updateMembers(member);
    });
  }
}

export async function freeCheckoutComplete(
  email: string,
  name: string,
  code: string,
  quantity: number
) {
  const { member, table } = await queryMemberBy(["code"], [code]);
  if (!member) return null;
  sendEmail(email, 1);
  const id = nanoid();
  await table.update(member.id, {
    remaining: member.fields.remaining - quantity,
    purchased: member.fields.purchased + quantity,
    email: email,
    name: name,
    ID: id,
  });
}
