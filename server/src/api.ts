import express, { Request, Response } from "express";
import { createStripeCheckoutSession } from "./checkout";
import { createPaymentIntent } from "./payments";
import { handleStripeWebhook } from "./webhooks";
export const app = express();

import cors from "cors";

app.use(cors({ origin: true }));
app.use(express.json());
app.use(
  express.json({
    verify: (req, res, buffer) => (req["rawBody"] = buffer),
  })
);

function runAsync(callback: Function) {
  return (req: Request, res: Response, next: Function) => {
    callback(req, res, next).catch(next);
  };
}

app.post(
  "/checkouts",
  runAsync(async ({ body }: Request, res: Response) => {
    res.send(await createStripeCheckoutSession(body.line_items));
  })
);

// app.post("/test", (req, res) => {
//   res.send("Hello from test endpoint");
// });

app.post(
  "/payments",
  runAsync(async ({ body }: Request, res: Response) => {
    res.send(await createPaymentIntent(body.amount));
  })
);

app.post("/hooks", runAsync(handleStripeWebhook));
