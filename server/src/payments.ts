import { stripe } from "./";

export async function createPaymentIntent() {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1000,
    currency: "gbp",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  paymentIntent.status;

  return paymentIntent;
}
