import React from "react";
import { useNavigate } from "react-router-dom";

export function CheckoutSuccess() {
  const nav = useNavigate();
  const url = window.location.href;
  const sessionId = new URL(url).searchParams.get("session_id");
  const home = () => {
    nav("/");
  };
  return (
    <div className="secondpageContainer">
      <div className="frameContainer">
        <h3>Checkout was a Success! confirmation sent by email. {sessionId}</h3>
        <button onClick={home}>exit</button>
      </div>
    </div>
  );
}
