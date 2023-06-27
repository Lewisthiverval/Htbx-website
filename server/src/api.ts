import express, { Request, Response } from "express";
import { createStripeCheckoutSession } from "./checkout";
import cors from "cors";
import { createPaymentIntent, updatePaymentComplete } from "./payments";
import { handleStripeWebhook } from "./webhooks";
export const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

function runAsync(callback: Function) {
  return (req: Request, res: Response, next: Function) => {
    callback(req, res, next).catch(next);
  };
}

const ticketTypes = new Map([
  ["full", { name: "Full Ticket", amount: 1500 }],
  ["concession", { name: "Concession Ticket", amount: 1200 }],
  ["staff", { name: "Staff Ticket", amount: 660 }],
  ["free", { name: "Free Ticket", amount: 0.0 }],
]);

app.post(
  "/checkouts",
  runAsync(async ({ body }: Request, res: Response) => {
    const line_items = body.line_items.map((item) => {
      const ticketType: any = ticketTypes.get(item.type);
      return {
        name: ticketType.name,
        amount: ticketType.amount,
        currency: "gbp",
        quantity: item.quantity,
      };
    });
    res.send(await createStripeCheckoutSession(line_items));
  })
);

app.post(
  "/hooks",
  express.raw({ type: "application/json" }),
  runAsync(handleStripeWebhook)
);

app.post(
  "/payments",
  runAsync(async ({ body }: Request, res: Response) => {
    createPaymentIntent(body.code)
      .then((x) => res.json(x))
      .catch((err) => {
        res.status(402);
        res.send(err.message || "");
      });
  })
);

app.post(
  "/login",
  runAsync(async ({ body }: Request, res: Response) => {
    body.password === process.env.ADMIN_PAGE_PASSWORD
      ? res.send(true)
      : res.send(false);
  })
);

app.get(
  "/success",
  runAsync(async (req: Request, res: Response) => {
    await updatePaymentComplete(req.query.payment_intent);
    res.setHeader("Location", "http://localhost:3000/success");
    res.status(302);
    res.end();
  })
);

app.get("/check-code", (req, res) => res.json({ price: 10_00 }));
