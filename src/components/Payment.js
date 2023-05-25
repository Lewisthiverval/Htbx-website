import React, { useEffect, useState } from "react";
import { fetchFromAPI } from "../functions/helpers";
import {
  CardElement,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "../App.css";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

export const stripePromise = loadStripe(
  " pk_test_51MXbMhJuyWQVRi2DTlIjJRwvKCYDU3Dl67oKoYiG1DCNNIEj3O5o15WKQhWUFsLOmokiHB3asQyZ910atxMM9nxr001NkCgvIs"
);

function Payment(product) {
  const [clientSecret, setClientSecret] = useState("");

  const createPaymentIntent = async (product) => {
    await fetchFromAPI("payments", {
      body: { amount: product.amount, quantity: product.quantity },
    }).then((response) => {
      console.log(response);

      setClientSecret(response.client_secret);
    });
  };

  useEffect(() => {
    createPaymentIntent(product);
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  const paymentElementOptions = {
    layout: "tabs",
  };
  console.log(clientSecret);
  return (
    <div className="checkoutContainer">
      <h1>PLease pay: {product.amount}</h1>
      {clientSecret && (
        <div className="checkout">
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
          </Elements>
        </div>
      )}
    </div>
  );
}

export default Payment;
