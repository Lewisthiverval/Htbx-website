import React, { useEffect } from "react";
import { db } from "../../config/firebase";
import { collection, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { ticketTypes } from "../../lib/ticketTypes";

export default function Member({ x, onRefresh }) {
  const membersRef = collection(db, "Members");
  // const sendEmailwithCode = () => {
  //   const recipientEmail = x.email;
  //   const subject = "Htbx Code";
  //   const body = `Hi ${x.name}, your private code is ${x.code}`;

  //   const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(
  //     subject
  //   )}&body=${encodeURIComponent(body)}`;

  //   window.location.href = mailtoLink;
  // };

  // const sendCode = async () => {
  //   try {
  //     const memberDocRef = doc(membersRef, x.id);
  //     sendEmailwithCode();
  //     await updateDoc(memberDocRef, { status: "sent" });
  //     onRefresh();
  //   } catch (error) {
  //     console.error("Error sending code:", error);
  //   }
  //   console.log(x.code);
  // };
  const deleteMember = async () => {
    console.log("deleting member");
    console.log(x.id);
    await deleteDoc(doc(db, "Members", x.id));

    onRefresh();
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
      <p>{`price: ${ticketTypes[x.type]?.amount}`}</p>
      {/* {x.status === "not sent" ? (
        <button onClick={sendCode}>send code</button>
      ) : (
        <div></div>
      )} */}
      <button onClick={deleteMember}>delete member</button>
    </div>
  );
}
