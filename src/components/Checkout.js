import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { useStripe } from "@stripe/react-stripe-js";

export function Checkout() {
  const [product, setProduct] = useState({
    name: "HTBX ticket",
    amout: 1000,
    currency: "usd",
    quantity: 1,
  });
  const stripe = useStripe();

  const changeQuantity = (v) => {
    setProduct({ ...product, quantity: product.quantity + v });
  };

  return (
    <div>
      <h1>HTBX ticket</h1>
      <button onClick={() => changeQuantity(-1)}>-</button>
      <span>{product.quantity}</span>
      <button onClick={() => changeQuantity(1)}>+</button>
    </div>
  );
}
