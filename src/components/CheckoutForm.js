import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  if (!stripe || !elements) {
    return;
  }
  const handleSubmit = async (event) => {
    console.log("working");
  };
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
    </form>
  );
}
