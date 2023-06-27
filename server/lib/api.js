"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
// import { createStripeCheckoutSession } from "./checkout";
const cors_1 = __importDefault(require("cors"));
const payments_1 = require("./payments");
exports.app = express_1.default();
exports.app.use(cors_1.default({ origin: true }));
exports.app.use(express_1.default.json());
exports.app.post("/payments", async ({ body }, res) => {
    await payments_1.createPaymentIntent({ code: body.code, quantity: body.quantity })
        .then((x) => res.json(x))
        .catch((error) => {
        console.log(error);
        res.status(402);
        res.json({ error });
    });
});
exports.app.get("/success", async (req, res) => {
    await payments_1.updatePaymentComplete(req.query.payment_intent);
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
//# sourceMappingURL=api.js.map