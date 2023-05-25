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

function Payments() {
  const [clientSecret, setClientSecret] = useState("");

  const createPaymentIntent = async (event) => {
    await fetchFromAPI("payments", {
      body: { amount: 1000 },
    }).then((response) => {
      setClientSecret(response.client_secret);
    });
  };

  useEffect(() => {
    createPaymentIntent();
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
      {clientSecret && (
        <div className="checkout">
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      )}
    </div>
  );
}

export default Payments;
