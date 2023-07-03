import React, { useState } from "react";

export default function Ticket({ ticket, index, addToChosen, modifyQuantity }) {
  const quan = ticket?.quantity;
  const name = ticket.name;
  const price = ticket?.price;
  const available = ticket?.remaining;

  return (
    <div className="row">
      <input
        type="checkbox"
        value="false"
        onChange={() => addToChosen(index)}
      ></input>
      <div key={index} className="ticket">
        <p className="name">{name}</p>
        <p className="price">£{price}</p>
        {/* <p className="type">{type}</p> */}
        <button
          onClick={() => {
            modifyQuantity(name, "+", available);
          }}
        >
          {" "}
          +{" "}
        </button>
        <p>{quan}</p>

        <button
          onClick={() => {
            modifyQuantity(name, "-", available);
          }}
        >
          {" "}
          -{" "}
        </button>
        <p>{`available: ${available}`}</p>
      </div>
    </div>
  );
}
