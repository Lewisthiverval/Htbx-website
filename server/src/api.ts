import express, { Request, Response } from "express";
import { createStripeCheckoutSession } from "./checkout";
export const app = express();

import cors from "cors";
app.use(cors({ origin: true }));

app.use(express.json());

function runAsync(callback: Function) {
  return (req: Request, res: Response, next: Function) => {
    callback(req, res, next).catch(next);
  };
}

app.post(
  "/checkouts",
  runAsync(async ({ body }: Request, res: Response) => {
    res.send(await createStripeCheckoutSession(body.line_items));
    //   res.send(body.line_items);
  })
);

app.post("/test", (req, res) => {
  res.send("Hello from test endpoint");
});
