import React, { useState } from "react";

import "../App.css";
import logo from "../htbx-logo.png";
import Payment from "./Payment";

import apple1 from "../sounds/apple1.wav";
import apple2 from "../sounds/apple2.wav";
import apple3 from "../sounds/apple3.wav";
import track1 from "../sounds/Puce Mary - The Size Of Our Desires (PAN 87).mp3";
import track2 from "../sounds/NN-Police Brutality.mp3";

export function Checkout() {
  const [code, setCode] = useState("");
  const [codeSubmitted, setCodeSubmitted] = useState(true);
  const [testObject, settestObject] = useState({
    amount: 1000,
    quantity: 2,
  });
  const [product, setProduct] = useState({
    type: "full",
    quantity: 1,
  });
  console.log(apple2, "apple2");
  const changeQuantity = (v) => {
    setProduct({ ...product, quantity: product.quantity + v });
  };
  const handleCode = (code) => {
    switch (code) {
      case "1":
        setProduct({ ...product, type: "full" });
        break;
      case "2":
        setProduct({ ...product, type: "concession" });
        break;
      case "3":
        setProduct({ ...product, type: "staff" });
        break;
      case "4":
        setProduct({ ...product, type: "free" });
        break;
    }
  };

  const handleClick = async (event) => {
    console.log("working");
    setCodeSubmitted(true);
  };

  return codeSubmitted ? (
    <div className="secondpageContainer">
      <div className="imageContainer">
        <img src={logo} alt="logo" width="300" height="90"></img>
      </div>
      <Payment testObject={testObject} />
    </div>
  ) : (
    <div>
      <div className="secondpageContainer">
        <div className="imageContainer">
          <img src={logo} alt="logo" width="300" height="90"></img>
        </div>
        {/* <img src={logoGif} alt="logo" width="500" height="500"></img> */}
      </div>
      <div className="frameContainer">
        <div className="frame"></div>
        <h1 style={{ color: "white" }}>{product.name}</h1>

        <input
          type="text"
          id="codeInput"
          name="CODE"
          placeholder="ENTER CODE"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            handleCode(e.target.value);
          }}
        ></input>
        <button onClick={() => changeQuantity(-1)}>-</button>
        <span style={{ color: "white" }}>{product.quantity}</span>
        <button onClick={() => changeQuantity(1)}>+</button>
        <button onClick={handleClick} disabled={product.quantity < 1}>
          Checkout
        </button>
      </div>
    </div>
  );
}

// export function CheckoutSuccess() {
//   const url = window.location.href;
//   const sessionId = new URL(url).searchParams.get("session_id");
//   return <h3>Checkout was a Success! {sessionId}</h3>;
// }

// export function CheckoutFail() {
//   return <h3>Checkout failed!</h3>;
// }
