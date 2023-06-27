import React from "react";
import { useState } from "react";
import AdminPage from "./AdminPage";

export default function AdminLogin() {
  const [auth, setAuth] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const password = e.target.elements.password.value;
    fetch("http://localhost:3001/login", {
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
        <form method="POST" action="/login" onSubmit={handleSubmit}>
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
