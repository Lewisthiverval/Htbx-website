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
          <Link to="/checkout">
            <h1 className="enter">E N T E R</h1>
          </Link>

          {/* <div className="gif"></div> */}
        </div>
        <img
          className="gif"
          height="400px"
          src="src/assets/alejandra.gif"
        ></img>
      </div>
    </div>
  );
}

export default App;
