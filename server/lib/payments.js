"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaymentIntent = void 0;
const _1 = require("./");
async function createPaymentIntent() {
    const paymentIntent = await _1.stripe.paymentIntents.create({
        amount: 1000,
        currency: "gbp",
        automatic_payment_methods: {
            enabled: true,
        },
    });
    paymentIntent.status;
    return paymentIntent;
}
exports.createPaymentIntent = createPaymentIntent;
//# sourceMappingURL=payments.js.map