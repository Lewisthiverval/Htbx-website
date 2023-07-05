import Stripe from "stripe";

import { app } from "./api";
import { config } from "dotenv";

// if (process.env.NODE_ENV !== "production") config();
config();
const stripeKey = process.env.STRIPE_SECRET_KEY;
if (!stripeKey) {
  throw new Error(`Missing STRIPE_SECRET_KEY environment variable`);
}

export const stripe = new Stripe(stripeKey, { apiVersion: "2020-03-02" });

const port = process.env.PORT || 3001;
app.listen(port, () =>
  console.log(`API available on http://localhost:${port}`)
);
