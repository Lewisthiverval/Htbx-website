import React, { useState } from "react";
import { db } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";

function MemberForm() {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");

  const membersRef = collection(db, "Members");
  const openForm = () => {
    setShowForm(true);
  };

  const addMember = async () => {
    try {
      const docRef = await addDoc(collection(db, "Members"), {
        name: name,
        email: email,
        code: code,
        status: "not sent",
        type: type,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setName("");
    setCode("");
    setEmail("");
    addMember();
    setShowForm(false);
  };

  const cancelClick = () => {
    setShowForm(false);
  };

  return (
    <div>
      {!showForm && <button onClick={openForm}>Add New Member</button>}

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

          <label>
            Type:
            <input
              type="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
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
