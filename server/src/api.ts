import express, { Request, Response } from "express";
// import { createStripeCheckoutSession } from "./checkout";
import cors from "cors";
import { createPaymentIntent, updatePaymentComplete } from "./payments";
import { freeCheckoutComplete } from "./payments";
import { getAllTicketsFromCode } from "./airtable";
import { getAllPurchasedTickets } from "./airtable";
export const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", async (_req, res) => {
  res.setHeader("Location", `${process.env.WEBAPP_URL}`);
  res.status(302);
  res.end();
});

app.post("/payments", async ({ body }: Request, res: Response) => {
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
  const paymentIntent = req.query.payment_intent;
  if (typeof paymentIntent !== "string") {
    res.setHeader(
      "Location",
      `${process.env.WEBAPP_URL}/failure?error=missingpaymentintent`
    );
    res.status(302);
    res.end();
    return;
  }

  await updatePaymentComplete(paymentIntent);
  res.setHeader("Location", `${process.env.WEBAPP_URL}/success`);
  res.status(302);
  res.end();
});

app.post("/freeCheckout", async ({ body }: Request, res: Response) => {
  const email = body.email;
  const name = body.name;
  const code = body.code;
  freeCheckoutComplete(email, name, code, body.quantity);
  res.json({});
});

app.post("/login", async ({ body }: Request, res: Response) => {
  body.password === process.env.ADMIN_PAGE_PASSWORD
    ? res.send(true)
    : res.send(false);
});

app.post("/getTickets", async ({ body }: Request, res: Response) => {
  const code = body.code;
  const tickets = await getAllTicketsFromCode(code);
  res.send(tickets);
});

app.post("/getPurchased", async (req, res) => {
  const purchased = await getAllPurchasedTickets();
  res.send(purchased);
});
