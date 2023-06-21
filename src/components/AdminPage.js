import React, { useEffect } from "react";
import { useState } from "react";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function AdminPage() {
  const [ravers, setRavers] = useState([]);
  const membersRef = collection(db, "Members");

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getDocs(membersRef);
        const cleanData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setRavers(cleanData);
      } catch (error) {
        console.error("Error retrieving data:", error);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <h1>HTBX Event</h1>
      {ravers.map((x) => (
        <div className="user" key={x.id}>
          <h2>{x.name}</h2>
          <p>{`email: ${x.email}`}</p>
          <p>{`type: ${x.type}`}</p>
          <p>{`code: ${x.code}`}</p>
          <p>sent: false</p>
        </div>
      ))}
    </div>
  );
}
