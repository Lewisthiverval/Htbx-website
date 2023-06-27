import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import {
  collection,
  getDocs,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

import "../App.css";
import logo from "../assets/htbx-logo.png";
import Payment from "./Payment";
import { ticketTypes } from "../lib/ticketTypes";

import apple1 from "../assets/sounds/apple1.wav";
import apple2 from "../assets/sounds/apple2.wav";
import apple3 from "../assets/sounds/apple3.wav";
import track1 from "../assets/sounds/Puce Mary - The Size Of Our Desires (PAN 87).mp3";
import track2 from "../assets/sounds/NN-Police Brutality.mp3";

export function Checkout() {
  const [price, setPrice] = useState(0);
  const [code, setCode] = useState(0);

  const handleCode = async (code) => {
    setCode(code);
  };

  const handleClick = async (event) => {
    event.preventDefault();
    fetch("http://localhost:3001/check-code")
      .then((res) => res.json())
      .then((data) => setPrice(data.price));
  };

  return price ? (
    <div className="secondpageContainer">
      <div className="frameContainer">
        <Payment code={code} />
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
              handleCode(e.target.value);
            }}
          ></input>
          <div className="quantityContainer"></div>
          <button className="sendButton" onClick={handleClick}>
            Send
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
