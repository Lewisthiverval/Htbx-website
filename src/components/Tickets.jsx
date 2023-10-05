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
  const [emailValue, setEmailValue] = useState({ email1: "", email2: "" });
  const [ticketName, setTicketName] = useState("");

  const [isLoading, setIsloading] = useState(true);
  const nav = useNavigate();

  const getTickets = async () => {
    await fetchFromAPI("getTickets", {
      body: { code: params.code.toLowerCase() },
    }).then((response) => {
      setIsloading(false);
      console.log(response, "response");
      response.length === 0 ? nav("/noCode") : setTickets(response);
      setTicketName(response[0].name.toLowerCase().replace(" ", ""));
    });
  };

  useEffect(() => {
    getTickets();
  }, []);

  useEffect(() => {
    console.log(emailValue.email1, emailValue.email2);
  }, [emailValue]);

  useEffect(() => {
    if (tickets.length > 0) {
      setIsloading(false);
    }
  }, [tickets]);

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
    if (
      validateEmail(emailValue.email1) &&
      emailValue.email1 === emailValue.email2
    ) {
      setTicketsChosen(true);
    } else {
      alert("Babe, focus! the emails don't match...");
    }
  };

  const handleEmail1Change = (event) => {
    setEmailValue((prev) => {
      return { email1: event.target.value, email2: prev.email2 };
    });
  };

  const handleEmail2Change = (event) => {
    setEmailValue((prev) => {
      return { email1: prev.email1, email2: event.target.value };
    });
  };

  return ticketsChosen ? (
    <Payment products={chosenTickets} email={emailValue.email1} />
  ) : (
    <div className="tickets-container">
      <img src={logo} className="logo" alt="logo" width="300" height="90"></img>

      <h4 style={{ fontStyle: "italic", opacity: 0.6 }}>
        Select your ticket(s):
      </h4>
      {isLoading && <p className="loading">loading...</p>}
      <div className="ticket-list">
        {tickets.map((ticket, index) => {
          return (
            <Ticket
              ticket={ticket}
              index={index}
              key={index}
              addToChosen={addToChosen}
              modifyQuantity={modifyQuantity}
            />
          );
        })}
      </div>
      <div className="checkoutAndEmail">
        <div>
          <input
            className="input666"
            type="text"
            id="myInput"
            placeholder="e-mail"
            value={emailValue.email1}
            onChange={handleEmail1Change}
          />
          <input
            className="input666"
            type="text"
            id="myInput"
            placeholder="confirm e-mail"
            value={emailValue.email2}
            onChange={handleEmail2Change}
          />
        </div>
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
