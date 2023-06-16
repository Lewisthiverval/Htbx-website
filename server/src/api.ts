import express, { Request, Response } from "express";
import { createStripeCheckoutSession } from "./checkout";
import cors from "cors";
import { createPaymentIntent } from "./payments";
import { handleStripeWebhook } from "./webhooks";
export const app = express();

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

app.post("/hooks", runAsync(handleStripeWebhook));

app.post(
  "/payments",
  runAsync(async ({ body }: Request, res: Response) => {
    res.send(await createPaymentIntent(body.amount));
  })
);

app.post(
  "/login",
  runAsync(async ({ body }: Request, res: Response) => {
    if (body.password === process.env.ADMIN_PAGE_PASSWORD) {
      res.send(true);
    } else {
      res.send(false);
    }
  })
);
