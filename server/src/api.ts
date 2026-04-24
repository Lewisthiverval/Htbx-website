import express, { Request, Response } from "express";
import expressWinston from "express-winston";
import winston from "winston";
import cors from "cors";
import * as env from "./env";

export const app = express();
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

const unavailable = (_req: Request, res: Response) => {
  res.status(503).json({ error: "Service temporarily unavailable" });
};

app.get("/", async (_req, res) => {
  res.setHeader("Location", `${env.WEBAPP_URL}`);
  res.status(302);
  res.end();
});

app.post("/login", async ({ body }: Request, res: Response) => {
  body.password === env.ADMIN_PAGE_PASSWORD ? res.send(true) : res.send(false);
});

app.post("/payments", unavailable);
app.get("/success", unavailable);
app.post("/ticket", unavailable);
app.post("/freeCheckout", unavailable);
app.post("/getTickets", unavailable);
app.post("/qr/:code/:ticket", unavailable);
app.get("/purchased", unavailable);
app.post("/scan", unavailable);
app.post("/updateQr", unavailable);
app.get("/resetFields", unavailable);
app.post("/manualTickets", unavailable);
