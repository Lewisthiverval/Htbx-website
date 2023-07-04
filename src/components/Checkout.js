import { useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";
import { Tickets } from "./Tickets";

import logo from "../assets/htbx-logo.png";
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
    if (event.key === "Enter") {
      event.preventDefault();

      nav(`/checkout/${code}`);
    }
  };

  // const handleKeyPress = (event) => {
  //   if (event.key === 'Enter') {
  //     event.preventDefault();
  //     document.getElementById('myButton').click();
  //   }
  // };

  return params.code ? (
    <div>
      <div className="secondpageContainer">
        <div className="frameContainer">
          <Tickets code={params.code} />
        </div>
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
            onKeyDown={handleClick}
          ></input>
          <div className="quantityContainer"></div>
        </div>
      </div>
    </div>
  );
}
