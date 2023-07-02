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
        <h1>
          Baaaaabes, ticket sent by email, omg thank u so much xoxoxoxo.{" "}
          {sessionId}
        </h1>
        <button onClick={home}>exit</button>
      </div>
    </div>
  );
}
