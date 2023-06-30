import React, { useEffect, useState } from "react";
import Payment from "./Payment";

export function TicketType(params) {
  const [ticketTypeChosen, setTicketTypeChosen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleCheckboxChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setTicketTypeChosen(true);
  };

  return ticketTypeChosen ? (
    <Payment code={params.code} type={selectedOption} />
  ) : (
    <div>
      <form onSubmit={onSubmit}>
        <label>
          <input
            type="checkbox"
            name="memberCheckbox"
            value="member"
            checked={selectedOption === "member"}
            onChange={handleCheckboxChange}
          ></input>
          Member
        </label>

        <label>
          <input
            type="checkbox"
            name="guestCheckbox"
            value="guest"
            checked={selectedOption === "guest"}
            onChange={handleCheckboxChange}
          ></input>
          Guest
        </label>

        <input type="submit" value="Submit" onSubmit={onSubmit}></input>
      </form>
    </div>
  );
}
