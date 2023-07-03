import React, { useEffect, useState } from "react";
import Payment from "./Payment";
import { fetchFromAPI } from "../functions/helpers";
import "./../tickets.css";
import { validateEmail } from "../functions/helpers";
import Ticket from "./Ticket";

export function Tickets(params) {
  const [ticketsChosen, setTicketsChosen] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [chosenTickets, setChosenTickets] = useState([]);
  const [emailValue, setEmailValue] = useState("");

  const getTickets = async () => {
    await fetchFromAPI("getTickets", { body: { code: params.code } }).then(
      (response) => {
        console.log(response, "response");
        setTickets(response);
      }
    );
  };

  useEffect(() => {
    getTickets();
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
  useEffect(() => {
    console.log(tickets);
    console.log(chosenTickets);
  }, [tickets]);

  const modifyQuantity = (name, operator, available) => {
    const formula = `x.quantity ${operator} 1 `;
    setTickets((prevChosenTickets) => {
      const mod = prevChosenTickets.map((x) => {
        const newQuantity = eval(formula);
        if (x.name === name && newQuantity <= available && newQuantity >= 1) {
          return { ...x, quantity: newQuantity };
        } else return x;
      });
      return mod;
    });
    console.log(tickets);

    setChosenTickets((prevChosenTickets) => {
      const mod = prevChosenTickets.map((x) => {
        const newQuantity = eval(formula);
        if (x.name === name && newQuantity <= available && newQuantity >= 1) {
          return { ...x, quantity: newQuantity };
        } else return x;
      });
      return mod;
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
            return (
              <Ticket
                ticket={ticket}
                index={index}
                addToChosen={addToChosen}
                modifyQuantity={modifyQuantity}
              />
            );
          })}
          <input
            type="text"
            id="myInput"
            placeholder="please enter email"
            value={emailValue}
            onChange={handleEmailChange}
          />
          <button onClick={handleClick} disabled={chosenTickets.length === 0}>
            Checkout
          </button>
        </div>
      ) : (
        <h1>Sorry babe, your code is sold out?! </h1>
      )}
    </div>
  );
}
