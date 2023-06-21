import React, { useState } from "react";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

function MemberForm() {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");

  const handleAddMember = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setName("");
    setCode("");
    setEmail("");
    setShowForm(false);
  };

  const cancelClick = () => {
    setShowForm(false);
  };

  return (
    <div>
      {!showForm && <button onClick={handleAddMember}>Add New Member</button>}

      {showForm && (
        <form onSubmit={handleFormSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label>
            Code:
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </label>

          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <button type="submit">Submit</button>
          <button onClick={cancelClick}>Cancel</button>
        </form>
      )}
    </div>
  );
}

export default MemberForm;
