import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import { CheckoutSuccess } from "./components/CheckoutSuccess";
import { ErrorBoundary } from "./components/ErrorBoundary";
import AdminLogin from "./components/admin/AdminLogin";
import { NoCode } from "./components/CheckoutSuccess";
import { Checkout } from "./components/Checkout";
import "./App.css";

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/success" element={<CheckoutSuccess />} />
        <Route path="/" element={<EnterPage />} />
        <Route path="/checkout/:code" element={<Checkout />} />
        <Route path="/checkout" element={<Checkout />} />
        {/* <Route path="/QRcode" element={<QRcode />} /> */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/noCode" element={<NoCode />} />
      </Routes>
    </ErrorBoundary>
  );
}

function EnterPage() {
  return (
    <div className="App">
      <div className="firstPageContainer">
        <div className="enterContainer">
          <h1 className="enter">SOLD OUT</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
