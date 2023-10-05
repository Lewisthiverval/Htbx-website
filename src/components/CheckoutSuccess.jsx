import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { fetchFromAPI } from "../functions/helpers";
import { useEffect } from "react";
const API = process.env.REACT_APP_API_URL;
export function CheckoutSuccess({ email }) {
  const { ticketname } = useParams();

  const individualTicketNames = ticketname.includes(",")
    ? ticketname.split(",")
    : [ticketname];

  const nav = useNavigate();
  const url = window.location.href;
  const sessionId = new URL(url).searchParams.get("session_id");
  const home = () => {
    nav("/");
  };
  function loadTickets(ticketNames) {
    ticketNames.forEach((x) => {
      loadTicket(x);
    });
  }

  function loadTicket(ticketName) {
    fetch(`${API}/ticket`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ticketName: ticketName }),
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        document.getElementById(ticketName).src = url;
      })
      .catch((error) => {
        console.error("Error loading ticket:", error);
      });
  }

  useEffect(() => {
    loadTickets(individualTicketNames);
  }, []);

  return (
    <div className="secondpageContainer">
      <div className="frameContainer">
        <h1>
          Thank u sxc. contact us at hi@htbx.london with any issues x.{" "}
          {sessionId}
        </h1>
        {individualTicketNames.map((x) => {
          return <iframe key={x} id={x} width="100%" height="600px"></iframe>;
        })}
        {/* <button onClick={() => loadTickets(individualTicketNames)}>
          Load Ticket
        </button> */}
        <div className="lastPageButton">
          <button className="button" onClick={home}>
            exit
          </button>
        </div>
      </div>
    </div>
  );
}

export function NoCode() {
  return (
    <div className="secondpageContainer">
      <div className="frameContainer">
        <h1> Sorry babe, your code is sold out?! </h1>
      </div>
    </div>
  );
}
