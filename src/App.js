import "./App.css";
import { Checkout } from "./components/Checkout";
import { CheckoutSuccess } from "./components/CheckoutSuccess";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import QRcode from "./components/QRcode";
import Admin from "./components/AdminLogin";
import AdminLogin from "./components/AdminLogin";

function App() {
  return (
    <Routes>
      <Route path="/success" element={<CheckoutSuccess />} />
      <Route path="/" element={<EnterPage />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/QRcode" element={<QRcode />} />
      <Route path="/admin" element={<AdminLogin />} />
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
