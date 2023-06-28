import React, { useState } from "react";
import { fetchFromAPI } from "../functions/helpers";
import useSwr from "swr";

import "../App.css";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

export const stripePromise = loadStripe(
  " pk_test_51MXbMhJuyWQVRi2DTlIjJRwvKCYDU3Dl67oKoYiG1DCNNIEj3O5o15WKQhWUFsLOmokiHB3asQyZ910atxMM9nxr001NkCgvIs"
);

function Payment(product) {
  const [quantity, setQuantity] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  const { data, isLoading, error } = useSwr(
    `checkout/${product.code}/${quantity}`,
    () => fetchFromAPI("payments", { body: { code: product.code, quantity } })
  );

  console.log(error, data);
  if (isLoading) return "Loading";
  if (error) {
    setErrorMessage(error);
    console.log(errorMessage);
  }
  return (
    <div className="checkoutContainer">
      <h1>Total: {data.price}£</h1>
      {data.client_secret && (
        <div className="checkout">
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret: data.client_secret,
              appearance: { theme: "stripe" },
            }}
          >
            <CheckoutForm />
          </Elements>
        </div>
      )}
    </div>
  );
}

export default Payment;
