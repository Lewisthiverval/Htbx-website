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
    <AdminPage />
  ) : (
    <div className="loginPage">
      <div>
        <form
          method="POST"
          action="/login"
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center text-purple-500 text-3xl bg-black rounded-md text-center border-3 border-purple-500 border-solid w-48 h-16"
        >
          <input
            className="bg-pink"
            type="password"
            id="password"
            placeholder="password"
            name="password"
            required
          ></input>
          <button className="" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
