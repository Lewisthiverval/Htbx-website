import { useState } from "react";
import "./App.css";
import PromoTix from "./components/Promotix";

import apple2 from "./sounds/apple2.wav";
import apple3 from "./sounds/apple3.wav";
import song from "./sounds/Puce Mary - The Size Of Our Desires (PAN 87).mp3";

function App() {
  const [entered, setEntered] = useState(false);
  const [enterTrackPlaying, setEnterTrackPlaying] = useState(true);

  const audio2 = new Audio(apple2);
  const audio3 = new Audio(apple3);
  const track = new Audio(song);
  const appleSounds = [];

  appleSounds.push(audio2, audio3);

  const handleClick = () => {
    setEntered(true);
    changeBackgroundImage();
    const randomIndex = Math.floor(Math.random() * appleSounds.length);
    const randomElement = appleSounds[randomIndex];
    randomElement.play();
    track.currentTime = 192;
    track.play();
    setEnterTrackPlaying(false);

    // audio.play();
  };

  const changeBackgroundImage = () => {
    document.body.style.backgroundImage = "url('image2.jpg')";
  };
  return (
    <div className="App">
      <div className="container">
        {entered ? (
          <PromoTix />
        ) : (
          <div className="enterContainer">
            <a
              onClick={() => {
                handleClick();
                document.body.style.backgroundImage = "url('image2.jpg')";
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
