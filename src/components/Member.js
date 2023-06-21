import React from "react";
import { db } from "../config/firebase";
import { collection, updateDoc, doc } from "firebase/firestore";

export default function Member({ x, onRefresh }) {
  const membersRef = collection(db, "Members");
  const sendCode = async () => {
    try {
      const memberDocRef = doc(membersRef, x.id);
      await updateDoc(memberDocRef, { status: "sent" });
      console.log("Code sent successfully!");
      onRefresh();
    } catch (error) {
      console.error("Error sending code:", error);
    }
    console.log(x.code);
  };
  return (
    <div className="user" key={x.id}>
      <h2 style={{ color: x.status === "purchased" ? "green" : "inherit" }}>
        {x.name}
      </h2>
      <p>{`email: ${x.email}`}</p>
      <p>{`type: ${x.type}`}</p>
      <p>{`code: ${x.code}`}</p>
      <p>{`status: ${x.status}`}</p>
      {x.status === "not sent" ? (
        <button onClick={sendCode}>send code</button>
      ) : (
        <div></div>
      )}
    </div>
  );
}
