import "./App.css";
import { Checkout } from "./components/Checkout";
import { CheckoutSuccess } from "./components/CheckoutSuccess";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/success" element={<CheckoutSuccess />} />
      <Route path="/" element={<EnterPage />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
}

function EnterPage() {
  return (
    <div className="App">
      <div className="firstPageContainer">
        <div className="enterContainer">
          <Link to="/checkout">
            <h1 className="enter">E N T E R</h1>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default App;
