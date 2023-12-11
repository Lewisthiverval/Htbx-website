import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const API = process.env.REACT_APP_API_URL;
import { Document, Page } from "react-pdf";

export function CheckoutSuccess({ email }) {
  const { ticketname } = useParams();
  const [tickets, setTickets] = useState(false);

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

  async function loadTicket(ticketName) {
    setTickets(true);
    await fetch(`${API}/ticket`, {
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
        <h1 className="successMessage">Thank u sxc!</h1>
        <h1 className="successMessage">
          Please save your tickets now, either by downloading them or taking a
          screenshot of the QR codes.
        </h1>
        <div className="viewTicketsContainer"></div>
        <div className="pdf-container">
          {individualTicketNames.map((x) => {
            return (
              <div key={x} className="pdf">
                <iframe id={x} height="400px"></iframe>
              </div>
            );
          })}
        </div>

        <div className="lastPageButton">
          <button className="button" onClick={home}>
            exit
          </button>
          <div className="successMessage">
            contact us at hi@htbx.london with any issues x. {sessionId}{" "}
          </div>
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
