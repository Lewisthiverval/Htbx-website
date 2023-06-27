"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUserPaymentIntentId = exports.getMemberByCode = exports.setUserPaymentComplete = void 0;
const airtable_1 = __importDefault(require("airtable"));
exports.setUserPaymentComplete = async (payment_intent) => {
    const base = new airtable_1.default({ apiKey: process.env.AIRTABLE_SECRET_TOKEN }).base("appe8kR3xJxcj1Jsr");
    const table = base("members");
    const member = await table
        .select({ filterByFormula: `{payment_intent} = '${payment_intent}'` })
        .all();
    console.log({ member, payment_intent });
    const id = member[0].id;
    return await table.update(id, { Status: "purchased" });
};
exports.getMemberByCode = async (code) => {
    const base = new airtable_1.default({ apiKey: process.env.AIRTABLE_SECRET_TOKEN }).base("appe8kR3xJxcj1Jsr");
    const table = base("members");
    const member = await table
        .select({
        filterByFormula: `{code} = '${code}'`,
    })
        .all()
        .then((x) => x === null || x === void 0 ? void 0 : x[0]);
    if (!member)
        return Promise.reject(`Missing member with code ${code}`);
    return member;
};
exports.setUserPaymentIntentId = async (code, payment_intent) => {
    var _a;
    const base = new airtable_1.default({ apiKey: process.env.AIRTABLE_SECRET_TOKEN }).base("appe8kR3xJxcj1Jsr");
    const table = base("members");
    const member = await table
        .select({
        filterByFormula: `{code} = '${code}'`,
    })
        .all();
    const id = (_a = member === null || member === void 0 ? void 0 : member[0]) === null || _a === void 0 ? void 0 : _a.id;
    if (!id)
        return Promise.reject(new Error(`Missing person with code ${code}`));
    return await table.update(id, { payment_intent });
};
//# sourceMappingURL=airtable.js.map