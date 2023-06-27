"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleStripeWebhook = void 0;
const _1 = require("./");
const webhookHandlers = {
    "payment_intent.succeeded": async (data) => {
        const id = data.metadata.id;
        console.log(id);
    },
    "payment_intent.payment_failed": async (data) => {
        const id = data.metadata.id;
        console.log(id);
    },
};
exports.handleStripeWebhook = async (req, res) => {
    const sig = req.headers["stripe-signature"];
    const event = _1.stripe.webhooks.constructEvent(
    // req["rawBody"],
    req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    try {
        await webhookHandlers[event.type](event.data.object);
        res.send({ received: true });
    }
    catch (err) {
        console.error(err);
        res.status(400).send(`Webhook Error: ${err}`);
    }
};
//# sourceMappingURL=webhooks.js.map