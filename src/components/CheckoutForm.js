import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Tickets } from "./Tickets";

export default function CheckoutForm({ tickets }) {
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const dataToPass = tickets.map((x) => {
    return { ID: x.ID, quantity: x.quantity };
  });
  const encodedDataToPass = encodeURIComponent(JSON.stringify(dataToPass));

  console.log(dataToPass, "datatopass");
  console.log(encodedDataToPass, "encoded");

  if (!stripe || !elements) {
    return;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);
    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://localhost:3001/success?data=${encodedDataToPass}`,
      },
    });

    if (error) {
      console.log(error);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      console.log("success");
    } else {
      setIsProcessing(false);
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button disabled={isProcessing || !stripe || !elements} id="submit">
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
      </button>

      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
