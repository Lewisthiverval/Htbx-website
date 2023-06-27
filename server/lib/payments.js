"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePaymentComplete = exports.createPaymentIntent = void 0;
const _1 = require("./");
const airtable_1 = require("./airtable");
async function createPaymentIntent(data) {
    var _a, _b, _c, _d;
    const { member, table } = await airtable_1.queryMemberBy("code", data.code);
    if (!member)
        return Promise.reject(`Cant find member with code`);
    if (data.quantity > member.fields.remaining) {
        return Promise.reject(`No tickets remaining`);
    }
    const payment_intent = (_a = member === null || member === void 0 ? void 0 : member.fields) === null || _a === void 0 ? void 0 : _a.payment_intent;
    const price = (_b = member === null || member === void 0 ? void 0 : member.fields) === null || _b === void 0 ? void 0 : _b.price;
    const remaining = (_c = member === null || member === void 0 ? void 0 : member.fields) === null || _c === void 0 ? void 0 : _c.remaining;
    const purchased = (_d = member === null || member === void 0 ? void 0 : member.fields) === null || _d === void 0 ? void 0 : _d.purchased;
    const amount = data.quantity * member.fields.price * 100;
    const createNewIntent = async () => {
        const paymentIntent = await _1.stripe.paymentIntents.create({
            currency: "gbp",
            amount,
            metadata: { code: data.code },
            automatic_payment_methods: { enabled: true },
        });
        await table.update(member.id, { payment_intent: paymentIntent.id });
        return {
            client_secret: paymentIntent.client_secret,
            price,
            remaining,
            purchased,
        };
    };
    if (!payment_intent)
        return createNewIntent();
    const intent = await _1.stripe.paymentIntents.retrieve(payment_intent);
    if (intent.amount !== amount)
        return createNewIntent();
    return { client_secret: intent.client_secret, price, remaining, purchased };
}
exports.createPaymentIntent = createPaymentIntent;
async function updatePaymentComplete(id) {
    const intent = await _1.stripe.paymentIntents.retrieve(id);
    if (intent.status === "succeeded") {
        const { member, table } = await airtable_1.queryMemberBy("payment_intent", id);
        if (!member)
            return null;
        const quantity = intent.amount / 100 / member.fields.price;
        await table.update(member.id, {
            remaining: member.fields.remaining - quantity,
            purchased: member.fields.purchased + quantity,
            payment_intent: "",
        });
    }
}
exports.updatePaymentComplete = updatePaymentComplete;
//# sourceMappingURL=payments.js.map