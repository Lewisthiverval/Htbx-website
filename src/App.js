import { useState } from "react";
import "./App.css";

import apple2 from "./sounds/apple2.wav";
import apple3 from "./sounds/apple3.wav";
import song from "./sounds/Puce Mary - The Size Of Our Desires (PAN 87).mp3";
import NN from "./sounds/NN-Police Brutality.mp3";

import PromoTix from "./components/Promotix";
import { Checkout } from "./components/Checkout";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  createBrowserRouter,
} from "react-router-dom";

function App() {
  const [entered, setEntered] = useState(false);
  // const [enterTrackPlaying, setEnterTrackPlaying] = useState(true);

  const audio2 = new Audio(apple2);
  const audio3 = new Audio(apple3);
  const track1 = new Audio(song);
  const track2 = new Audio(NN);
  const appleSounds = [];

  appleSounds.push(audio2, audio3);

  const handleClick = () => {
    setEntered(true);
    changeBackgroundImage();
    const randomIndex = Math.floor(Math.random() * appleSounds.length);
    const randomElement = appleSounds[randomIndex];
    randomElement.play();
    track2.currentTime = 30;
    track2.play();
    // setEnterTrackPlaying(false);

    // audio.play();
  };

  const changeBackgroundImage = () => {
    document.body.style.backgroundImage = "url('htbx_scan.JPG')";
  };

  return (
    <div className="App">
      <div className="container">
        {entered ? (
          <PromoTix />
        ) : (
          // <Checkout />
          <div className="enterContainer">
            <a
              onClick={() => {
                handleClick();
                document.body.style.backgroundImage = "url('htbx_scan.JPG'')";
                document.body.style.backgroundColor = "#000000 ";
              }}
            >
              <h1 className="enter">E N T E R</h1>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
