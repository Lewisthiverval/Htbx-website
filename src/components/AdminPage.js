import React, { useEffect } from "react";
import { useState } from "react";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import Member from "./Member";
import NewMemberForm from "./NewMemberForm";

export default function AdminPage() {
  const [ravers, setRavers] = useState([]);
  const [showForm, setShowForm] = useState(false);
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

  const handleClick = () => {
    setShowForm(true);
  };

  return (
    <div>
      <h1>HTBX Event</h1>
      <NewMemberForm />
      {ravers.map((x) => (
        <Member x={x} />
      ))}
    </div>
  );
}
