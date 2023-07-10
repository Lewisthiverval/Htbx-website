import React, { useEffect, useState } from "react";
import { fetchFromAPI } from "../functions/helpers";
import { validateEmail } from "../functions/helpers";
import useSwrMutation from "swr/mutation";
import useSwr from "swr";
import logo from "../assets/htbx-logo.jpg";
import "../App.css";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useNavigate } from "react-router-dom";

// export const stripePromise = loadStripe(
//   " pk_test_51MXbMhJuyWQVRi2DTlIjJRwvKCYDU3Dl67oKoYiG1DCNNIEj3O5o15WKQhWUFsLOmokiHB3asQyZ910atxMM9nxr001NkCgvIs"
// ); //LEWIS TEST

// export const stripePromise = loadStripe(
//   "pk_test_51MXoFZDggugLLcXGmagoSEtRZwQeznmfZtGlq8GSBZyjKlgxxv2abFHduZB51EzISy6j7TP0bCNUBsh9bVxoKmNj00yAmtSMyt"
// ); //BECKY TEST

export const stripePromise = loadStripe(
  "pk_live_51MXoFZDggugLLcXG0Evqd7w2yDoej2w4bik2o1M3jrzaRUMRWqVBPmEjHGaQFLrzrjBnxQ8rqjyxMMZSgYYuZ98700Gx1tYYqI"
); //BECKY ACTUAL

function Payment({ products, email }) {
  const nav = useNavigate();

  const { data, isLoading, error } = useSwr(
    `checkout/${products[0]?.code}`,
    () =>
      fetchFromAPI("payments", {
        body: {
          tickets: products,
          email: email,
        },
      })
  );

  const checkoutfree = useSwrMutation("freeCheckout", () =>
    fetchFromAPI("freeCheckout", {
      body: {
        tickets: products,
        email: email,
      },
    })
  );

  if (isLoading) return "Loading";
  if (error) {
    console.log(error);
  }

  const handleClick = () => {
    if (validateEmail(email)) {
      checkoutfree.trigger().then(() => nav("/success"));
    }
  };

  return (
    <div className="checkoutContainer">
      {data.price === 0 ? (
        <div>
          <button
            className="button"
            onClick={handleClick}
            disabled={checkoutfree.isLoading}
          >
            Send free ticket by email
          </button>
        </div>
      ) : (
        <>
          <h1> Total: {data.amount / 100}£</h1>
          {data.client_secret && (
            <div className="checkout">
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret: data.client_secret,
                  id: data.id,
                  appearance: {
                    theme: "night",
                    variables: {
                      colorText: "green",

                      // See all possible variables below
                    },
                  },
                }}
              >
                <CheckoutForm tickets={products} />
              </Elements>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Payment;
