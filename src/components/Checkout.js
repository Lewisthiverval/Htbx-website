import React, { useState } from "react";

import "../App.css";
import logo from "../htbx-logo.png";
import Payments from "./Payments";

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

  // const handleClick = async (event) => {
  //   setCodeSubmitted(true);
  //   const body = { line_items: [product] };
  //   const { id: sessionId } = await fetchFromAPI("checkouts", {
  //     body,
  //   });
  //   const { error } = await stripe.redirectToCheckout({
  //     sessionId,
  //   });
  //   if (error) {
  //     console.log(error);
  //   }
  // };

  return codeSubmitted ? (
    <div className="secondpageContainer">
      <div className="imageContainer">
        <img src={logo} alt="logo" width="300" height="90"></img>
        <Payments testObject={testObject} />
      </div>
    </div>
  ) : (
    <div>
      <div className="secondpageContainer">
        <div className="imageContainer">
          <img src={logo} alt="logo" width="300" height="90"></img>
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
