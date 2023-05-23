import React, { useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { fetchFromAPI } from "../functions/helpers";
import "../App.css";
import logo from "../htbx-logo.png";

export function Checkout() {
  const [product, setProduct] = useState({
    name: "HTBX ticket",
    amount: 1000,
    currency: "usd",
    quantity: 1,
  });

  const stripe = useStripe();

  const changeQuantity = (v) => {
    setProduct({ ...product, quantity: product.quantity + v });
  };

  const handleClick = async (event) => {
    const body = { line_items: [product] };
    const { id: sessionId } = await fetchFromAPI("checkouts", {
      body,
    });
    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });
    if (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="secondpageContainer">
        <div className="imageContainer">
          <img src={logo} alt="logo" width="300" height="90"></img>
          {/* <img src={logoGif} alt="logo" width="500" height="500"></img> */}
        </div>
        <div className="frameContainer">
          <div className="frame"></div>
          <h1 style={{ color: "white" }}>{product.name}</h1>
          <button onClick={() => changeQuantity(-1)}>-</button>
          <span style={{ color: "white" }}>{product.quantity}</span>
          <button onClick={() => changeQuantity(1)}>+</button>
          <button onClick={handleClick} disabled={product.quantity < 1}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export function CheckoutSuccess() {
  const url = window.location.href;
  const sessionId = new URL(url).searchParams.get("session_id");
  return <h3>Checkout was a Success! {sessionId}</h3>;
}

export function CheckoutFail() {
  return <h3>Checkout failed!</h3>;
}
