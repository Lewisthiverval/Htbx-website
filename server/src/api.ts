import express, { Request, Response } from "express";
// import { createStripeCheckoutSession } from "./checkout";
import cors from "cors";
import { createPaymentIntent, updatePaymentComplete } from "./payments";
import { freeCheckoutComplete } from "./payments";
export const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", async (_req, res) => {
  res.setHeader("Location", `${process.env.WEBAPP_URL}`);
  res.status(302);
  res.end();
});

app.post("/payments", async ({ body }: Request, res: Response) => {
  await createPaymentIntent({
    code: body.code,
    quantity: body.quantity,
    type: body.type,
    email: body.email,
    name: body.name,
  })
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
  // sendEmail();
  res.setHeader("Location", `${process.env.WEBAPP_URL}/success`);
  res.status(302);
  res.end();
});

app.post("/freeCheckout", async ({ body }: Request, res: Response) => {
  const email = body.email;
  const name = body.name;
  const code = body.code;
  freeCheckoutComplete(email, name, code);
  res.json({});
});

app.post("/login", async ({ body }: Request, res: Response) => {
  body.password === process.env.ADMIN_PAGE_PASSWORD
    ? res.send(true)
    : res.send(false);
});
