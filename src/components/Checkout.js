import { useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";

import logo from "../assets/htbx-logo.png";
import Payment from "./Payment";
// import apple1 from "../assets/sounds/apple1.wav";
// import apple2 from "../assets/sounds/apple2.wav";
// import apple3 from "../assets/sounds/apple3.wav";
// import track1 from "../assets/sounds/Puce Mary - The Size Of Our Desires (PAN 87).mp3";
// import track2 from "../assets/sounds/NN-Police Brutality.mp3";

export function Checkout() {
  const [code, setCode] = useState("");
  const params = useParams();
  const nav = useNavigate();

  const handleClick = async (event) => {
    event.preventDefault();
    nav(`/checkout/${code}`);
  };

  return params.code ? (
    <div className="secondpageContainer">
      <div className="frameContainer">
        <Payment code={params.code} />
      </div>
    </div>
  ) : (
    <div>
      <div className="secondpageContainer">
        <div className="frameContainer">
          <img src={logo} alt="logo" width="300" height="90"></img>
          <input
            type="text"
            className="codeInput"
            name="CODE"
            placeholder="ENTER CODE"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
            }}
          ></input>
          <div className="quantityContainer"></div>
          <button className="sendButton" onClick={handleClick}>
            submit
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
