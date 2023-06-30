import React, { useEffect, useState } from "react";
import Payment from "./Payment";

export function TicketType(params) {
  const [ticketTypeChosen, setTicketTypeChosen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleCheckboxChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setTicketTypeChosen(true);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return ticketTypeChosen ? (
    <Payment
      code={params.code}
      type={selectedOption}
      email={email}
      name={name}
    />
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
        {selectedOption === "guest" ? (
          <div>
            <label>
              Email:
              <input type="email" onChange={handleEmailChange} />
            </label>
            <br />
            <label>
              Name:
              <input type="text" onChange={handleNameChange} />
            </label>
            <br />
          </div>
        ) : (
          <div></div>
        )}
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
