import express, { Request, Response, response } from "express";
import { stripe } from "./";
import cors from "cors";
import { createPaymentIntent, updatePaymentComplete } from "./payments";
import { freeCheckoutComplete } from "./payments";
import { getAllTicketsFromCode } from "./airtable";
import sgMail from "@sendgrid/mail";
import path from "path";
import fs from "fs";

export const app = express();

const WEBAPP_URL = process.env.WEBAPP_URL!;
const ADMIN_PAGE_PASSWORD = process.env.ADMIN_PAGE_PASSWORD!;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY!;

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", async (_req, res) => {
  res.setHeader("Location", `${WEBAPP_URL}`);
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
  const intent = await stripe.paymentIntents.retrieve(paymentIntent);
  const email = intent.metadata.email;

  if (typeof paymentIntent !== "string") {
    res.setHeader(
      "Location",
      `${WEBAPP_URL}/failure?error=missingpaymentintent`
    );
    res.status(302);
    res.end();
    return;
  }

  try {
    const decodedData = JSON.parse(decodeURIComponent(encodedData));
    await updatePaymentComplete(paymentIntent, decodedData);
    setTimeout(() => {
      confirmEmail(decodedData, email);
    }, 5000);
  } catch (error) {
    res.setHeader("Location", `${WEBAPP_URL}/failure?error=decodingerror`);
    res.status(302);
    res.end();
    return;
  }

  res.setHeader("Location", `${WEBAPP_URL}/success`);
  res.status(302);
  res.end();
});

app.post("/freeCheckout", async ({ body }: Request, res: Response) => {
  await freeCheckoutComplete(body.tickets, body.email);

  res.setHeader("Location", `${WEBAPP_URL}/success`);
  res.status(302);
  res.end();
});

app.post("/login", async ({ body }: Request, res: Response) => {
  body.password === ADMIN_PAGE_PASSWORD ? res.send(true) : res.send(false);
});

app.post("/getTickets", async ({ body }: Request, res: Response) => {
  const code = body.code;
  const tickets = await getAllTicketsFromCode(code);
  res.send(tickets);
});

const confirmEmail = async (names: Array<any>, address: string) => {
  await sgMail.setApiKey(SENDGRID_API_KEY);

  let tickets: Array<any> = [];

  names.forEach((name) => {
    for (let i = 0; i < name.quantity; i++) {
      names.forEach((x) => {
        const fileName = `ticket_${x.name}.pdf`;
        const filePath = path.join(__dirname, "tickets", fileName);
        const fileContent = fs.readFileSync(filePath, { encoding: "base64" });

        tickets.push({
          content: fileContent,
          filename: fileName,
          type: "application/pdf",
          disposition: "attachment",
        });
      });
    }
  });

  const msg = {
    from: "lewismurray78@gmail.com",
    to: address,
    subject: "ticket",
    text: "htbx ticket",
    attachments: tickets,
  };
  await sgMail.send(msg);
};
