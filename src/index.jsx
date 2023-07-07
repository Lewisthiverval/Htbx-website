import React from "react";
import ReactDOM from "react-dom/client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { HashRouter } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";
import App from "./App";

import "./index.css";

export const stripePromise = loadStripe(
  " pk_test_51MXbMhJuyWQVRi2DTlIjJRwvKCYDU3Dl67oKoYiG1DCNNIEj3O5o15WKQhWUFsLOmokiHB3asQyZ910atxMM9nxr001NkCgvIs"
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <HashRouter>
        <App />
      </HashRouter>
    </Elements>
  </React.StrictMode>
);

reportWebVitals();
