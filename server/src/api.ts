import express, { Request, Response } from "express";
// import { createStripeCheckoutSession } from "./checkout";
import cors from "cors";
import { createPaymentIntent, updatePaymentComplete } from "./payments";
export const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.post("/payments", async ({ body }: Request, res: Response) => {
  await createPaymentIntent({ code: body.code, quantity: body.quantity })
    .then((x) => res.json(x))
    .catch((error) => {
      console.log(error);
      res.status(402);
      res.json({ error });
    });
});
app.get("/success", async (req: Request, res: Response) => {
  await updatePaymentComplete(req.query.payment_intent);
  res.setHeader("Location", "http://localhost:3000/success");
  res.status(302);
  res.end();
});

// app.post(
//   "/login",
//   runAsync(async ({ body }: Request, res: Response) => {
//     body.password === process.env.ADMIN_PAGE_PASSWORD
//       ? res.send(true)
//       : res.send(false);
//   })
// );
