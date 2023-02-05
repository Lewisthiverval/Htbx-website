import { useState } from "react";
import "./App.css";
import PromoTix from "./components/Promotix";

function App() {
  const [entered, setEntered] = useState(false);

  const handleClick = () => {
    setEntered(true);
    changeBackgroundImage();
  };

  const changeBackgroundImage = () => {
    document.body.style.backgroundImage = "url('/image2.jpg')";
  };
  return (
    <div className="App">
      <div className="container">
        {entered ? (
          <PromoTix />
        ) : (
          <a
            onClick={() => {
              handleClick();
              document.body.style.backgroundImage = "url('/image2.jpg')";
              document.body.style.backgroundColor = "#ff007f ";
            }}
          >
            <h1 className="enter">E N T E R</h1>
          </a>
        )}
      </div>
    </div>
  );
}

export default App;
