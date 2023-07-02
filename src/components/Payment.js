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

function Payment({ products, email }) {
  // const [emailValue, setEmailValue] = useState("");
  const nav = useNavigate();

  const { data, isLoading, error } = useSwr(
    `checkout/${products[0].code}`,
    () =>
      fetchFromAPI("payments", {
        body: {
          tickets: products,
          email: email,
        },
      })
  );

  useEffect(() => {
    console.log(data, "DATA");
  }, [data]);

  const checkoutfree = useSwrMutation("freeCheckout", () =>
    fetchFromAPI("freeCheckout", {
      body: {
        email: email,
        code: products[0].code,
        name: products[0].name,
      },
    }).then((response) => console.log(response))
  );

  if (isLoading) return "Loading";
  if (error) {
    console.log(error);
  }

  const handleClick = () => {
    if (validateEmail(email))
      checkoutfree.trigger().then(() => {
        nav("/success");
      });
  };

  const validateEmail = (email) => {
    // Using regex pattern for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="checkoutContainer">
      {data.price === 0 ? (
        <div>
          {/* <input
            type="text"
            id="myInput"
            placeholder="please enter email"
            value={emailValue}
            onChange={handleEmailChange}
          /> */}
          <button onClick={handleClick} disabled={checkoutfree.isLoading}>
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
