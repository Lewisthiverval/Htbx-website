import { stripe } from "./";
import {
  getMemberByCode,
  setUserPaymentIntentId,
  setUserPaymentComplete,
} from "./airtable";

export async function createPaymentIntent(code: string) {
  const member = await getMemberByCode(code);
  const payment_intent = member?.fields?.payment_intent as string;

  if (!payment_intent) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 10_00,
      metadata: { code },
      currency: "gbp",
      automatic_payment_methods: { enabled: true },
    });

    await setUserPaymentIntentId(code, paymentIntent.id);

    return { client_secret: paymentIntent.client_secret };
  }

  const intent = await stripe.paymentIntents.retrieve(payment_intent);

  return { client_secret: intent.client_secret };
}

export async function updatePaymentComplete(id) {
  const intent = await stripe.paymentIntents.retrieve(id);
  if (intent.status === "succeeded") {
    await setUserPaymentComplete(id);
  }
  console.log(intent.status === "succeeded");
}
