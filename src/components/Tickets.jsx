import React, { useEffect, useState } from "react";
import Payment from "./Payment";
import { fetchFromAPI } from "../functions/helpers";
import "./../tickets.css";
import { validateEmail } from "../functions/helpers";
import Ticket from "./Ticket";
import { useNavigate } from "react-router-dom";
import logo from "../assets/htbx-logo.jpg";

export function Tickets(params) {
  const [ticketsChosen, setTicketsChosen] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [chosenTickets, setChosenTickets] = useState([]);
  const [emailValue, setEmailValue] = useState("");
  const nav = useNavigate();

  const getTickets = async () => {
    await fetchFromAPI("getTickets", { body: { code: params.code } }).then(
      (response) => {
        console.log(response, "response");
        response.length === 0 ? nav("/noCode") : setTickets(response);
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
      alert("Babe, focus! that email is invalid");
    }
  };

  const handleEmailChange = (event) => {
    setEmailValue(event.target.value);
  };

  return ticketsChosen ? (
    <Payment products={chosenTickets} email={emailValue} />
  ) : (
    <div className="tickets-container">
      <img src={logo} alt="logo" width="300" height="90"></img>
      <h4 style={{ fontStyle: "italic", opacity: 0.6 }}>
        Select your ticket(s):
      </h4>
      <div className="ticket-list">
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
      </div>
      <div className="checkoutAndEmail">
        <input
          className="input666"
          type="text"
          id="myInput"
          placeholder="Email"
          value={emailValue}
          onChange={handleEmailChange}
        />
        <button
          className="button checkout-button"
          onClick={handleClick}
          disabled={chosenTickets.length === 0}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
