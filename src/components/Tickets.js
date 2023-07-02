import React, { useEffect, useState } from "react";
import Payment from "./Payment";
import { fetchFromAPI } from "../functions/helpers";
import "./../tickets.css";

export function Tickets(params) {
  const [ticketsChosen, setTicketsChosen] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [chosenTickets, setChosenTickets] = useState([]);
  const [emailValue, setEmailValue] = useState("");

  const getTickets = async () => {
    await fetchFromAPI("getTickets", { body: { code: params.code } }).then(
      (response) => {
        console.log(response);
        setTickets(response);
      }
    );
  };

  const validateEmail = (email) => {
    // Using regex pattern for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    getTickets();
    console.log(tickets);
  }, []);

  const addToChosen = (ticketIndex) => {
    setChosenTickets((prevChosenTickets) => {
      const updatedChosenTickets = [...prevChosenTickets];
      const ticket = tickets[ticketIndex];
      const ticketIndexInChosen = updatedChosenTickets.findIndex(
        (chosenTicket) => chosenTicket === ticket
      );
      if (ticketIndexInChosen === -1) {
        updatedChosenTickets.push(ticket);
      } else {
        updatedChosenTickets.splice(ticketIndexInChosen, 1);
      }
      return updatedChosenTickets;
    });
  };

  const handleClick = () => {
    if (validateEmail(emailValue)) {
      setTicketsChosen(true);
    } else {
      prompt("Babe, focus! that email is invalid");
    }
  };

  const handleEmailChange = (event) => {
    setEmailValue(event.target.value);
  };

  return ticketsChosen ? (
    <Payment products={chosenTickets} email={emailValue} />
  ) : (
    <div className="ticket-list">
      {tickets.length > 0 ? (
        <div>
          <h1> Tickets </h1>
          {tickets.map((ticket, index) => {
            const name = ticket?.name;
            const price = ticket?.price;
            const email = ticket?.email;
            const type = ticket?.type;

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
                  {/* <p className="email">{email}</p> */}
                  <p className="type">{type}</p>
                </div>
              </div>
            );
          })}
          <input
            type="text"
            id="myInput"
            placeholder="please enter email"
            value={emailValue}
            onChange={handleEmailChange}
          />
          <button onClick={handleClick}>Checkout</button>
        </div>
      ) : (
        <h1>Sorry babe, your code is sold out?! </h1>
      )}
      {/* <h1> Tickets </h1>
      {tickets.map((ticket, index) => {
        const name = ticket?.name;
        const price = ticket?.price;
        const email = ticket?.email;
        const type = ticket?.type;

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
              <p className="email">{email}</p>
              <p className="type">{type}</p>
            </div>
          </div>
        );
      })}
      <input
        type="text"
        id="myInput"
        placeholder="please enter email"
        value={emailValue}
        onChange={handleEmailChange}
      />
      <button onClick={handleClick}>Checkout</button> */}
    </div>
  );
}
