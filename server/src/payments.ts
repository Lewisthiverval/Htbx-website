import Airtable from "airtable";
import Stripe from "stripe";

import { queryMemberBy } from "./airtable";
import { createTickets } from "./email";
import * as env from "./env";

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-03-02",
});

export async function createPaymentIntent(
  data: Array<any>,
  email: string,
  amount: number
) {
  function cutoffDecimal(number: number) {
    return Number(number.toFixed(2));
  }
  const fixedAmount = cutoffDecimal(amount);
  const { member } = await queryMemberBy(["name"], [data[0].name]);
  const payment_intent = member?.fields?.payment_intent as string;

  const updatePaymentIntent = async (ID: string, paymentIntent: string) => {
    const { member, table } = await queryMemberBy(["ID"], [ID]);
    table.update(member.id, {
      payment_intent: paymentIntent,
    });
  };

  const names = data.map((x) => x.name);
  const metaNames = names.join();

  const createNewIntent = async () => {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "gbp",
      amount: fixedAmount,
      metadata: { code: data[0].code, email: email, names: metaNames },
    });

    data.forEach((x) => {
      updatePaymentIntent(x.ID, paymentIntent.id);
    });

    return {
      client_secret: paymentIntent.client_secret,
      amount: fixedAmount,
      id: paymentIntent.id,
    };
  };

  if (!payment_intent) return createNewIntent();
  const intent = await stripe.paymentIntents.retrieve(payment_intent);
  if (intent.amount !== fixedAmount) return createNewIntent();
  return {
    client_secret: intent.client_secret,
    amount,
  };
}

export const updatePaymentComplete = async (id: string, data: any) => {
  const intent = await stripe.paymentIntents.retrieve(id);
  const email = intent.metadata.email;

  const Q = data
    .map((x: any) => x.quantity)
    .reduce((prev: number, curr: number) => {
      return prev + curr;
    }, 0);

  const namesAndQuantity = data.map((x: any) => {
    const obj = { name: x.name, quantity: x.quantity };
    return obj;
  });

  await createTickets(namesAndQuantity);
  // await sendEmail(email, namesAndQuantity);

  const updateAirtable = async () => {
    data.forEach(async (x: any) => {
      const ID = x.ID;
      const quantity = x.quantity;

      const { member, table } = await queryMemberBy(["ID"], [ID]);
      await table.update(member.id, {
        payment_intent: "",
        remaining: member.fields.remaining - quantity,
        purchased: member.fields.purchased + quantity,
      });
    });
  };
  if (intent.status === "succeeded") {
    // await updateAirtable();
    // sendEmail(email, quantityForEmail, names);
    await updateAirtable();

    // sendEmail(email, Q, names);
  }
};

export async function freeCheckoutComplete(tickets: Array<any>, email: string) {
  const baseId = process.env.AIRTABLE_BASEID;
  if (!baseId) throw new Error(`Missing AIRTABLE_BASEID environment variable`);
  const base = new Airtable({ apiKey: process.env.AIRTABLE_SECRET_TOKEN }).base(
    baseId
  );
  const tableName = process.env.AIRTABLE_NAME;
  if (!tableName) throw new Error(`Missing AIRTABLE_NAME environment variable`);
  const table = base(tableName);
  tickets.forEach(async (x: any) => {
    const recordId = x.ID;

    await table
      .select({
        filterByFormula: `{ID} = '${recordId}'`,
      })
      .all()
      .then((record: any) => {
        table.update(record.id, {
          payment_intent: "tessst",
        });
      });
  });
}
