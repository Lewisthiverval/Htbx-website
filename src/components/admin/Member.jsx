import React, { useEffect } from "react";
import { ticketTypes } from "../../lib/ticketTypes";

export default function Member({ x, onRefresh }) {
  return (
    <div className="user" key={x.id}>
      <h2 style={{ color: x.status === "purchased" ? "green" : "inherit" }}>
        {x.fields.name}
      </h2>
      <p>{`email: ${x.fields.email}`}</p>
      <p>{`type: ${x.fields.type}`}</p>
      <p>{`code: ${x.fields.code}`}</p>
      {/* <p>{`status: ${x.fields.status}`}</p> */}
      {/* <p>{`price: ${ticketTypes[x.fields.type]?.amount}`}</p> */}
    </div>
  );
}
