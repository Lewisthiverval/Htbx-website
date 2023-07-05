import React from "react";
import "../App.css";
import logo from "../assets/htbx-logo.jpg";

export default function PromoTix() {
  return (
    <div className="secondpageContainer">
      <div className="imageContainer">
        <img src={logo} alt="logo" width="300" height="90"></img>
        {/* <img src={logoGif} alt="logo" width="500" height="500"></img> */}
      </div>
      <div className="frameContainer">
        <div className="frame">
          <iframe
            height="500"
            src="https://app.promotix.com/trade/select-tickets/HTBX-tickets-2?embedded_to_iframe=true"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
