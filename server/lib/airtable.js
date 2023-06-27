"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryMemberBy = void 0;
const airtable_1 = __importDefault(require("airtable"));
exports.queryMemberBy = async (key, value) => {
    const base = new airtable_1.default({ apiKey: process.env.AIRTABLE_SECRET_TOKEN }).base(process.env.AIRTABLE_BASEID);
    const table = base(process.env.AIRTABLE_NAME);
    const member = await table
        .select({
        filterByFormula: `{${key}} = '${value}'`,
    })
        .all()
        .then((x) => x === null || x === void 0 ? void 0 : x[0]);
    return { member, table };
};
//# sourceMappingURL=airtable.js.map