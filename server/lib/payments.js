"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePaymentComplete = exports.createPaymentIntent = void 0;
const _1 = require("./");
const airtable_1 = require("./airtable");
async function createPaymentIntent(code) {
    var _a;
    const member = await airtable_1.getMemberByCode(code);
    const payment_intent = (_a = member === null || member === void 0 ? void 0 : member.fields) === null || _a === void 0 ? void 0 : _a.payment_intent;
    if (!payment_intent) {
        const paymentIntent = await _1.stripe.paymentIntents.create({
            amount: 1000,
            metadata: { code },
            currency: "gbp",
            automatic_payment_methods: { enabled: true },
        });
        await airtable_1.setUserPaymentIntentId(code, paymentIntent.id);
        return { client_secret: paymentIntent.client_secret };
    }
    const intent = await _1.stripe.paymentIntents.retrieve(payment_intent);
    return { client_secret: intent.client_secret };
}
exports.createPaymentIntent = createPaymentIntent;
async function updatePaymentComplete(id) {
    const intent = await _1.stripe.paymentIntents.retrieve(id);
    if (intent.status === "succeeded") {
        await airtable_1.setUserPaymentComplete(id);
    }
    console.log(intent.status === "succeeded");
}
exports.updatePaymentComplete = updatePaymentComplete;
//# sourceMappingURL=payments.js.map