"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.sendEmail = exports.freeCheckoutComplete = exports.updatePaymentComplete = exports.createPaymentIntent = exports.stripe = void 0;
var airtable_1 = require("airtable");
var stripe_1 = require("stripe");
var createTickets_1 = require("./createTickets");
var airtable_2 = require("./airtable");
var env = require("./env");
exports.stripe = new stripe_1["default"](env.STRIPE_SECRET_KEY, {
    apiVersion: "2020-03-02"
});
function createPaymentIntent(data, email, amount) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        function cutoffDecimal(number) {
            return Number(number.toFixed(2));
        }
        var fixedAmount, member, payment_intent, updatePaymentIntent, names, metaNames, createNewIntent, intent;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    fixedAmount = cutoffDecimal(amount);
                    return [4 /*yield*/, airtable_2.queryMemberBy(["name"], [data[0].name])];
                case 1:
                    member = (_b.sent()).member;
                    payment_intent = (_a = member === null || member === void 0 ? void 0 : member.fields) === null || _a === void 0 ? void 0 : _a.payment_intent;
                    updatePaymentIntent = function (ID, paymentIntent) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, member, table;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, airtable_2.queryMemberBy(["ID"], [ID])];
                                case 1:
                                    _a = _b.sent(), member = _a.member, table = _a.table;
                                    table.update(member.id, {
                                        payment_intent: paymentIntent
                                    });
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    names = data.map(function (x) { return x.name; });
                    metaNames = names.join();
                    createNewIntent = function () { return __awaiter(_this, void 0, void 0, function () {
                        var paymentIntent;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, exports.stripe.paymentIntents.create({
                                        currency: "gbp",
                                        amount: fixedAmount,
                                        metadata: { code: data[0].code, email: email, names: metaNames }
                                    })];
                                case 1:
                                    paymentIntent = _a.sent();
                                    data.forEach(function (x) {
                                        updatePaymentIntent(x.ID, paymentIntent.id);
                                    });
                                    return [2 /*return*/, {
                                            client_secret: paymentIntent.client_secret,
                                            amount: fixedAmount,
                                            id: paymentIntent.id
                                        }];
                            }
                        });
                    }); };
                    if (!payment_intent)
                        return [2 /*return*/, createNewIntent()];
                    return [4 /*yield*/, exports.stripe.paymentIntents.retrieve(payment_intent)];
                case 2:
                    intent = _b.sent();
                    if (intent.amount !== fixedAmount)
                        return [2 /*return*/, createNewIntent()];
                    return [2 /*return*/, {
                            client_secret: intent.client_secret,
                            amount: amount
                        }];
            }
        });
    });
}
exports.createPaymentIntent = createPaymentIntent;
exports.updatePaymentComplete = function (id, data) { return __awaiter(void 0, void 0, void 0, function () {
    var intent, email, Q, namesAndQuantity, updateAirtable;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.stripe.paymentIntents.retrieve(id)];
            case 1:
                intent = _a.sent();
                email = intent.metadata.email;
                Q = data
                    .map(function (x) { return x.quantity; })
                    .reduce(function (prev, curr) {
                    return prev + curr;
                }, 0);
                namesAndQuantity = data.map(function (x) {
                    var obj = { name: x.name, quantity: x.quantity };
                    return obj;
                });
                return [4 /*yield*/, createTickets_1.createTickets(namesAndQuantity)];
            case 2:
                _a.sent();
                updateAirtable = function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        data.forEach(function (x) { return __awaiter(void 0, void 0, void 0, function () {
                            var ID, quantity, _a, member, table;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        ID = x.ID;
                                        quantity = x.quantity;
                                        return [4 /*yield*/, airtable_2.queryMemberBy(["ID"], [ID])];
                                    case 1:
                                        _a = _b.sent(), member = _a.member, table = _a.table;
                                        return [4 /*yield*/, table.update(member.id, {
                                                payment_intent: "",
                                                remaining: member.fields.remaining - quantity,
                                                purchased: member.fields.purchased + quantity
                                            })];
                                    case 2:
                                        _b.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                    });
                }); };
                if (!(intent.status === "succeeded")) return [3 /*break*/, 4];
                // await updateAirtable();
                // sendEmail(email, quantityForEmail, names);
                return [4 /*yield*/, updateAirtable()];
            case 3:
                // await updateAirtable();
                // sendEmail(email, quantityForEmail, names);
                _a.sent();
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };
function freeCheckoutComplete(tickets, email) {
    return __awaiter(this, void 0, void 0, function () {
        var baseId, base, tableName, table;
        var _this = this;
        return __generator(this, function (_a) {
            baseId = process.env.AIRTABLE_BASEID;
            if (!baseId)
                throw new Error("Missing AIRTABLE_BASEID environment variable");
            base = new airtable_1["default"]({ apiKey: process.env.AIRTABLE_SECRET_TOKEN }).base(baseId);
            tableName = process.env.AIRTABLE_NAME;
            if (!tableName)
                throw new Error("Missing AIRTABLE_NAME environment variable");
            table = base(tableName);
            tickets.forEach(function (x) { return __awaiter(_this, void 0, void 0, function () {
                var recordId;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            recordId = x.ID;
                            return [4 /*yield*/, table
                                    .select({
                                    filterByFormula: "{ID} = '" + recordId + "'"
                                })
                                    .all()
                                    .then(function (record) {
                                    table.update(record.id, {
                                        payment_intent: "tessst"
                                    });
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
}
exports.freeCheckoutComplete = freeCheckoutComplete;
exports.sendEmail = function () { return __awaiter(void 0, void 0, void 0, function () {
    var key, names, directoryPath, filesToAttach, msg, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                key = process.env.SENDGRID_API_KEY;
                sgMail.setApiKey(key);
                names = [
                    { name: "becky", quantity: 2 },
                    { name: "lol", quantity: 1 },
                ];
                directoryPath = __dirname;
                filesToAttach = names.map(function (name) {
                    var fileName = "ticket_" + name.name + ".pdf";
                    var filePath = path.join(directoryPath, "tickets", fileName);
                    var fileContent = fs.readFileSync(filePath, { encoding: "base64" });
                    return {
                        content: fileContent,
                        filename: fileName,
                        type: "application/pdf",
                        disposition: "attachment"
                    };
                });
                msg = {
                    to: "lewismurray78@gmail.com",
                    from: "lewismurray78@gmail.com",
                    subject: "whatever",
                    text: "hiiiii",
                    attachments: filesToAttach
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, sgMail.send(msg)];
            case 2:
                _a.sent();
                return [2 /*return*/, "success"];
            case 3:
                error_1 = _a.sent();
                console.error("Error sending email:", error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
