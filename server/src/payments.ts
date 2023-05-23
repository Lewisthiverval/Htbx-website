import { stripe } from "./";

export async function createPaymentIntent(amount: number) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "gbp",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  paymentIntent.status;

  return paymentIntent;
}
