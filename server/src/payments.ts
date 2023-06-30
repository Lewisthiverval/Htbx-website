import { stripe } from "./";
import { queryMemberBy } from "./airtable";
import { sendEmail } from "./email";
import { nanoid } from "nanoid";

export async function createPaymentIntent(data: {
  code: string;
  quantity: number;
  type: string;
  email: string;
  name: string;
}) {
  const { member, table } = await queryMemberBy(
    ["code", "type"],
    [data.code, data.type]
  );

  if (!member) return Promise.reject(`Cant find member with code`);
  if (data.quantity > member.fields.remaining) {
    return Promise.reject(`No tickets remaining`);
  }

  const payment_intent = member?.fields?.payment_intent as string;
  const price = member?.fields?.price;
  const remaining = member?.fields?.remaining;
  const purchased = member?.fields?.purchased;
  const amount = data.quantity * (member.fields.price as number) * 100;
  const name = member?.fields?.name as string;

  if (data.name !== "" && data.email !== "") {
    await table.update(member.id, {
      email: data.email,
      name: name + `, ${data.name}`,
    });
  }

  if (price === 0) {
    return { client_secret: null, price, remaining, purchased };
  }

  const createNewIntent = async () => {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "gbp",
      amount,
      metadata: { code: data.code },
    });

    await table.update(member.id, { payment_intent: paymentIntent.id });

    return {
      client_secret: paymentIntent.client_secret,
      price,
      remaining,
      purchased,
    };
  };

  if (!payment_intent) return createNewIntent();

  const intent = await stripe.paymentIntents.retrieve(payment_intent);

  if (intent.amount !== amount) return createNewIntent();

  return { client_secret: intent.client_secret, price, remaining, purchased };
}

export async function updatePaymentComplete(id: string) {
  const intent = await stripe.paymentIntents.retrieve(id);

  if (intent.status === "succeeded") {
    const { member, table } = await queryMemberBy(["payment_intent"], [id]);
    if (!member) return null;
    const address = member?.fields?.email as string;
    sendEmail(address);
    const quantity = intent.amount / 100 / member.fields.price;

    await table.update(member.id, {
      remaining: member.fields.remaining - quantity,
      purchased: member.fields.purchased + quantity,
      payment_intent: "",
    });
  }
}

export async function freeCheckoutComplete(
  email: string,
  name: string,
  code: string
) {
  const { member, table } = await queryMemberBy(["code"], [code]);
  if (!member) return null;
  sendEmail(email);
  const id = nanoid();
  const quantity = 1;
  await table.update(member.id, {
    remaining: member.fields.remaining - quantity,
    purchased: member.fields.purchased + quantity,
    email: email,
    name: name,
    payment_intent: id,
  });
}
