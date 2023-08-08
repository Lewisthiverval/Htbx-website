import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import logo from "../assets/htbx-logo.jpg";

export default function CheckoutForm({ tickets }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const dataToPass = tickets.map((x) => {
    return { ID: x.ID, quantity: x.quantity, name: x.name, email: x.email };
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
        return_url: `${process.env.REACT_APP_API_URL}/success?data=${encodedDataToPass}`,
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
    <div>
      <form className="payment-form" id="payment-form" onSubmit={handleSubmit}>
        <div className="paymentelementContainer">
          <PaymentElement id="payment-element" />
        </div>
        <button
          className="button"
          disabled={isProcessing || !stripe || !elements}
          id="submit"
        >
          <span id="button-text">
            {isProcessing ? "Processing ... " : "Pay now"}
          </span>
        </button>
      </form>
    </div>
  );
}
