import React from "react";

export default function Member({ x }) {
  return (
    <div className="user" key={x.id}>
      <h2 style={{ color: x.status === "purchased" ? "green" : "inherit" }}>
        {x.name}
      </h2>
      <p>{`email: ${x.email}`}</p>
      <p>{`type: ${x.type}`}</p>
      <p>{`code: ${x.code}`}</p>
      <p>{`status: ${x.status}`}</p>
      <button>send code</button>
    </div>
  );
}
