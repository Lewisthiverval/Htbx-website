import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Tickets } from "./Tickets";
import NIN from "../assets/sounds/NIN-WAX.mp3";
import halloween from "../assets//sounds/halloween.mp3";

import padam from "../assets/sounds/PadamPadam.mp3";
import ufo from "../assets/sounds/UFO95.mp3";

import logo from "../assets/htbx-logo.jpg";
// import apple1 from "../assets/sounds/apple1.wav";
// import apple2 from "../assets/sounds/apple2.wav";
// import apple3 from "../assets/sounds/apple3.wav";
// import track1 from "../assets/sounds/Puce Mary - The Size Of Our Desires (PAN 87).mp3";
// import track2 from "../assets/sounds/NN-Police Brutality.mp3";

import { Socials } from "./Socials";

export function Checkout() {
  const [code, setCode] = useState("");
  const params = useParams();
  const nav = useNavigate();
  const track = new Audio(ufo);
  const handleClick = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      console.log("click");
      nav(`/checkout/${code}`);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("click");
    nav(`/checkout/${code}`);
  };

  useEffect(() => {
    track.currentTime = 5;
    // track.play();

    const handleTrackEnd = () => {
      track.currentTime = 219.5;
      // track.play();
    };

    track.addEventListener("ended", handleTrackEnd);
    return () => {
      track.removeEventListener("ended", handleTrackEnd);
    };
  }, []);

  return params.code ? (
    <div className="secondpageContainer">
      <div className="frameContainer">
        <Tickets code={params.code} />
      </div>
      <Socials />
    </div>
  ) : (
    <div className="secondpageContainer">
      <img className="logo" src={logo} alt="logo" width="300" height="90"></img>
      <div className="frameContainer">
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
        <button className="button home" onClick={handleSubmit}>
          Submit
        </button>

        <div className="quantityContainer"></div>
      </div>
      <Socials />
    </div>
  );
}
