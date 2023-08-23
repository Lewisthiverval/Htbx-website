import React from "react";
import { useNavigate } from "react-router-dom";

export function CheckoutSuccess({ email }) {
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
          Thank u sxc. contact us at hi@htbx.london with any issues x.{" "}
          {sessionId}
        </h1>
        <div calssName="lastPageButton">
          <button className="button" onClick={home}>
            exit
          </button>
        </div>
      </div>
    </div>
  );
}

export function NoCode() {
  return (
    <div className="secondpageContainer">
      <div className="frameContainer">
        <h1> Sorry babe, your code is sold out?! </h1>
      </div>
    </div>
  );
}
