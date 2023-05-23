"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const checkout_1 = require("./checkout");
const cors_1 = __importDefault(require("cors"));
const payments_1 = require("./payments");
const webhooks_1 = require("./webhooks");
exports.app = express_1.default();
exports.app.use(cors_1.default({ origin: "http://localhost:3000" }));
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.json({
    verify: (req, res, buffer) => (req["rawBody"] = buffer),
}));
function runAsync(callback) {
    return (req, res, next) => {
        callback(req, res, next).catch(next);
    };
}
const ticketTypes = new Map([
    ["full", { name: "Full Ticket", amount: 1500 }],
    ["concession", { name: "Concession Ticket", amount: 1200 }],
    ["staff", { name: "Staff Ticket", amount: 660 }],
    ["free", { name: "Free Ticket", amount: 0.0 }],
]);
exports.app.post("/checkouts", runAsync(async ({ body }, res) => {
    const line_items = body.line_items.map((item) => {
        const ticketType = ticketTypes.get(item.type);
        return {
            name: ticketType.name,
            amount: ticketType.amount,
            currency: "gbp",
            quantity: item.quantity,
        };
    });
    res.send(await checkout_1.createStripeCheckoutSession(line_items));
}));
exports.app.post("/hooks", runAsync(webhooks_1.handleStripeWebhook));
exports.app.post("/payments", runAsync(async ({ body }, res) => {
    res.send(await payments_1.createPaymentIntent(body.amount));
}));
//# sourceMappingURL=api.js.map