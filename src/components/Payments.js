import React, { useEffect, useState } from "react";
import { fetchFromAPI } from "../functions/helpers";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "../App.css";

function Payments({ testObject }) {
  const stripe = useStripe();
  const [amount, setAmount] = useState();
  const [paymentIntent, setPaymentIntent] = useState();
  const elements = useElements();

  const createPaymentIntent = async (event) => {
    const validAmount = Math.min(Math.max(amount, 50), 9999999);
    setAmount(validAmount);
    const pi = await fetchFromAPI("payments", {
      body: { amount: 2000 },
    });
    setPaymentIntent(pi);
  };

  useEffect(() => {
    createPaymentIntent();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cardElement = elements.getElement(CardElement);

    const { paymentIntent: updatedPaymentIntent, error } =
      await stripe.confirmCardPayment(paymentIntent.client_secret, {
        payment_method: { card: cardElement },
      });

    if (error) {
      console.error(error);
      error.payment_intent && setPaymentIntent(error.payment_intent);
      console.log("Payment failed");
    } else {
      setPaymentIntent(updatedPaymentIntent);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="well"
      hidden={!paymentIntent || paymentIntent.status === "succeeded"}
    >
      <h3>Step 2: Submit a Payment Method</h3>
      <p>Collect credit card details, then submit the payment.</p>
      <p>
        Normal Card: <code>4242424242424242</code>
      </p>
      <p>
        3D Secure Card: <code>4000002500003155</code>
      </p>

      <hr />

      <CardElement />
      <button className="btn btn-success" type="submit">
        Pay
      </button>
    </form>
  );
}

export default Payments;
