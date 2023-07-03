import React, { useState } from "react";

export default function Ticket({ ticket, index, addToChosen, modifyQuantity }) {
  const [isSelected, setIsSelected] = useState(false);
  const quan = ticket?.quantity;
  const name = ticket.name;
  const price = ticket?.price;
  const available = ticket?.remaining;

  const handleCardClick = () => {
    setIsSelected(!isSelected);
    addToChosen(index);
  };

  const handleQuantityIncrease = (e) => {
    e.stopPropagation(); // Stop event propagation
    modifyQuantity(name, "+", available);
  };

  const handleQuantityDecrease = (e) => {
    e.stopPropagation(); // Stop event propagation
    modifyQuantity(name, "-", available);
  };

  return (
    <div
      className={`ticket-card ${isSelected ? "selected" : ""}`}
      onClick={handleCardClick}
    >
      <input
        type="checkbox"
        value="false"
        onChange={() => addToChosen(index)}
      ></input>
      <div key={index} className="ticket">
        <p className="name">{name}</p>
        <p className="price">£{price}</p>
        {/* <p className="type">{type}</p> */}
        <div className="quantity-controls">
          <button onClick={handleQuantityIncrease}> + </button>
          <p>{quan}</p>

          <button onClick={handleQuantityDecrease}> - </button>
        </div>
        <p className="available">{`available: ${available}`}</p>
      </div>
    </div>
  );
}
