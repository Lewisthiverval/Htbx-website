import React from "react";
import "../App.css";
import Qrcode from "./QRcode";

export default function QRcode() {
  let canvas = document.getElementById("canvas");

  Qrcode.toCanvas(canvas, "sample text", function (error) {
    if (error) console.error(error);
    console.log("success!");
  });
  return <canvas id="qr-code"></canvas>;
  return <h1>canvas</h1>;
}
