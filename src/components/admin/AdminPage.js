import React, { useEffect } from "react";
import { useState } from "react";
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import Member from "./Member";
import NewMemberForm from "./NewMemberForm";
import { fetchFromAPI } from "../../functions/helpers";

export default function AdminPage() {
  const [ravers, setRavers] = useState([]);
  const membersRef = collection(db, "Members");

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

  const getOtherData = async () => {
    fetchFromAPI("/success", {});
  };
  useEffect(() => {
    getData();
  }, []);

  const handleRefresh = () => {
    getData();
  };

  return (
    <div>
      <h1>HTBX Event</h1>
      <button onClick={getOtherData}></button>
      <NewMemberForm />
      {ravers.map((x) => (
        <Member key={x.id} x={x} onrefresh onRefresh={handleRefresh} />
      ))}
    </div>
  );
}
