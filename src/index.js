import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { BrowserRouter } from "react-router-dom";

export const stripePromise = loadStripe(
  " pk_test_51MXbMhJuyWQVRi2DTlIjJRwvKCYDU3Dl67oKoYiG1DCNNIEj3O5o15WKQhWUFsLOmokiHB3asQyZ910atxMM9nxr001NkCgvIs"
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Elements>
  </React.StrictMode>
);

reportWebVitals();
