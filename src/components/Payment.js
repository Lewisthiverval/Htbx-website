import React, { useEffect, useState } from "react";
import { fetchFromAPI } from "../functions/helpers";
import useSwrMutation from "swr/mutation";
import useSwr from "swr";

import "../App.css";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useNavigate } from "react-router-dom";

export const stripePromise = loadStripe(
  " pk_test_51MXbMhJuyWQVRi2DTlIjJRwvKCYDU3Dl67oKoYiG1DCNNIEj3O5o15WKQhWUFsLOmokiHB3asQyZ910atxMM9nxr001NkCgvIs"
);

function Payment(product) {
  const [quantity, setQuantity] = useState(1);
  const nav = useNavigate();

  const { data, isLoading, error } = useSwr(
    `checkout/${product.code}/${quantity}`,
    () => fetchFromAPI("payments", { body: { code: product.code, quantity } })
  );

  const checkoutfree = useSwrMutation(() =>
    fetchFromAPI("/freeCheckout", {}).then((response) => response.json())
  );

  if (isLoading) return "Loading";
  if (error) {
    console.log(error);
  }

  const handleClick = () => {
    checkoutfree.trigger().then(console.log);
    nav("/success");
  };

  return (
    <div className="checkoutContainer">
      {data.price === 0 ? (
        <button onClick={handleClick} disabled={checkoutfree.isLoading}>
          Send ticket
        </button>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}

export default Payment;
