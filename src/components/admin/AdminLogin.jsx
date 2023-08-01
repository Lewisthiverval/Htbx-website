import React from "react";
import { useState } from "react";
import { AdminPage } from "./AdminPage";
import "./admin.css";

export default function AdminLogin() {
  const [auth, setAuth] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const password = e.target.elements.password.value;
    fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        data === true ? setAuth(true) : setAuth(false);
      })
      .catch((error) => console.error(error));
  };

  return auth ? (
    <div>
      <AdminPage />
    </div>
  ) : (
    <div className="loginPage">
      <div>
        <form
          method="POST"
          action="/login"
          onSubmit={handleSubmit}
          className="inputC"
        >
          <input
            type="password"
            id="password"
            placeholder="password"
            name="password"
            required
          ></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
