import express, { Request, Response } from "express";
import expressWinston from "express-winston";
import winston from "winston";
import Stripe from "stripe";
import cors from "cors";

import { createPaymentIntent, updatePaymentComplete } from "./payments";
import { getAllTicketsFromCode } from "./airtable";
import { freeCheckoutComplete } from "./payments";
import { confirmEmail } from "./email";
import * as env from "./env";

export const app = express();
export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-03-02",
});

app.use(cors({ origin: true }));
app.use(express.json());
app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
  })
);

app.get("/", async (_req, res) => {
  res.setHeader("Location", `${env.WEBAPP_URL}`);
  res.status(302);
  res.end();
});

app.post("/payments", async ({ body }: Request, res: Response) => {
  function cutoffDecimal(number: number) {
    return Number(number.toFixed(2));
  }
  const amount = body.tickets
    .map((x: any) => {
      return x.price * x.quantity;
    })
    .reduce((prev: any, curr: any) => {
      return prev + curr;
    }, 0);

  if (amount === 0) {
    return res.json({ price: 0, client_secret: null, id: null });
  }

  await createPaymentIntent(body.tickets, body.email, amount * 100)
    .then((x) => res.json(x))
    .catch((error) => {
      console.log(error);
      res.status(402);
      res.json({ error });
    });
});

app.get("/success", async (req: Request, res: Response) => {
  const paymentIntent: any = req.query.payment_intent;
  const encodedData: any = req.query.data;
  console.log({ paymentIntent, encodedData });
  if (typeof paymentIntent !== "string") {
    res.setHeader(
      "Location",
      `${env.WEBAPP_URL}/failure?error=missingpaymentintent`
    );
    res.status(302);
    res.end();
    return;
  }

  try {
    const intent = await stripe.paymentIntents.retrieve(paymentIntent);
    const email = intent.metadata.email;
    const decodedData = JSON.parse(decodeURIComponent(encodedData));
    console.log({ decodedData, email, intent });

    await updatePaymentComplete(paymentIntent, decodedData);
    setTimeout(() => {
      confirmEmail(decodedData, email);
    }, 5000);
  } catch (error) {
    res.setHeader("Location", `${env.WEBAPP_URL}/failure?error=decodingerror`);
    res.status(302);
    res.end();
    return;
  }

  res.setHeader("Location", `${env.WEBAPP_URL}/success`);
  res.status(302);
  res.end();
});

app.post("/freeCheckout", async ({ body }: Request, res: Response) => {
  await freeCheckoutComplete(body.tickets, body.email);

  res.setHeader("Location", `${env.WEBAPP_URL}/success`);
  res.status(302);
  res.end();
});

app.post("/login", async ({ body }: Request, res: Response) => {
  body.password === env.ADMIN_PAGE_PASSWORD ? res.send(true) : res.send(false);
});

app.post("/getTickets", async ({ body }: Request, res: Response) => {
  const code = body.code;
  const tickets = await getAllTicketsFromCode(code);
  res.send(tickets);
});
