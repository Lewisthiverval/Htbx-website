import React from "react";

export function CheckoutSuccess() {
  const url = window.location.href;
  const sessionId = new URL(url).searchParams.get("session_id");
  return <h1>Checkout was a Success! {sessionId}</h1>;
}
