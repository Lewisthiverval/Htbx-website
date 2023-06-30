import { stripe } from "./";
import { queryMemberBy } from "./airtable";

export async function createPaymentIntent(data: {
  code: string;
  quantity: number;
  type: string;
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

    const quantity = intent.amount / 100 / member.fields.price;

    await table.update(member.id, {
      remaining: member.fields.remaining - quantity,
      purchased: member.fields.purchased + quantity,
      payment_intent: "",
    });
  }
}
