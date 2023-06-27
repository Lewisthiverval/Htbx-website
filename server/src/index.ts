import Stripe from "stripe";
import { app } from "./api";
import { config } from "dotenv";

if (process.env.NODE_ENV !== "production") config();

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

const port = process.env.PORT || 3001;
app.listen(port, () =>
  console.log(`API available on http://localhost:${port}`)
);
