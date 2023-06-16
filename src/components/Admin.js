import React from "react";
import { useState } from "react";
import { fetchFromAPI } from "../functions/helpers";
import e from "cors";

export default function Admin() {
  const [auth, setAuth] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const password = e.target.elements.password.value;
    console.log(password);
  };
  return auth ? (
    <div>
      <h1>Auth!</h1>
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
