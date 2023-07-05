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
exports.stripe = exports.app = void 0;
var express_1 = require("express");
var express_winston_1 = require("express-winston");
var mail_1 = require("@sendgrid/mail");
var winston_1 = require("winston");
var stripe_1 = require("stripe");
var cors_1 = require("cors");
var path_1 = require("path");
var fs_1 = require("fs");
var payments_1 = require("./payments");
var airtable_1 = require("./airtable");
var payments_2 = require("./payments");
var env = require("./env");
exports.app = express_1["default"]();
exports.stripe = new stripe_1["default"](env.STRIPE_SECRET_KEY, {
    apiVersion: "2020-03-02"
});
exports.app.use(cors_1["default"]({ origin: true }));
exports.app.use(express_1["default"].json());
exports.app.use(express_winston_1["default"].logger({
    transports: [new winston_1["default"].transports.Console()],
    format: winston_1["default"].format.combine(winston_1["default"].format.colorize(), winston_1["default"].format.json())
}));
exports.app.get("/", function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.setHeader("Location", "" + env.WEBAPP_URL);
        res.status(302);
        res.end();
        return [2 /*return*/];
    });
}); });
exports.app.post("/payments", function (_a, res) {
    var body = _a.body;
    return __awaiter(void 0, void 0, void 0, function () {
        function cutoffDecimal(number) {
            return Number(number.toFixed(2));
        }
        var amount;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    amount = body.tickets
                        .map(function (x) {
                        return x.price * x.quantity;
                    })
                        .reduce(function (prev, curr) {
                        return prev + curr;
                    }, 0);
                    if (amount === 0) {
                        return [2 /*return*/, res.json({ price: 0, client_secret: null, id: null })];
                    }
                    return [4 /*yield*/, payments_1.createPaymentIntent(body.tickets, body.email, amount * 100)
                            .then(function (x) { return res.json(x); })["catch"](function (error) {
                            console.log(error);
                            res.status(402);
                            res.json({ error: error });
                        })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
});
exports.app.get("/success", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var paymentIntent, encodedData, intent, email_1, decodedData_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                paymentIntent = req.query.payment_intent;
                encodedData = req.query.data;
                console.log({ paymentIntent: paymentIntent, encodedData: encodedData });
                if (typeof paymentIntent !== "string") {
                    res.setHeader("Location", env.WEBAPP_URL + "/failure?error=missingpaymentintent");
                    res.status(302);
                    res.end();
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, exports.stripe.paymentIntents.retrieve(paymentIntent)];
            case 2:
                intent = _a.sent();
                email_1 = intent.metadata.email;
                decodedData_1 = JSON.parse(decodeURIComponent(encodedData));
                console.log({ decodedData: decodedData_1, email: email_1, intent: intent });
                res.send("success");
                return [4 /*yield*/, payments_1.updatePaymentComplete(paymentIntent, decodedData_1)];
            case 3:
                _a.sent();
                setTimeout(function () {
                    confirmEmail(decodedData_1, email_1);
                }, 5000);
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                res.setHeader("Location", env.WEBAPP_URL + "/failure?error=decodingerror");
                res.status(302);
                res.end();
                return [2 /*return*/];
            case 5:
                res.setHeader("Location", env.WEBAPP_URL + "/success");
                res.status(302);
                res.end();
                return [2 /*return*/];
        }
    });
}); });
exports.app.post("/freeCheckout", function (_a, res) {
    var body = _a.body;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, payments_2.freeCheckoutComplete(body.tickets, body.email)];
                case 1:
                    _b.sent();
                    res.setHeader("Location", env.WEBAPP_URL + "/success");
                    res.status(302);
                    res.end();
                    return [2 /*return*/];
            }
        });
    });
});
exports.app.post("/login", function (_a, res) {
    var body = _a.body;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            body.password === env.ADMIN_PAGE_PASSWORD ? res.send(true) : res.send(false);
            return [2 /*return*/];
        });
    });
});
exports.app.post("/getTickets", function (_a, res) {
    var body = _a.body;
    return __awaiter(void 0, void 0, void 0, function () {
        var code, tickets;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    code = body.code;
                    return [4 /*yield*/, airtable_1.getAllTicketsFromCode(code)];
                case 1:
                    tickets = _b.sent();
                    res.send(tickets);
                    return [2 /*return*/];
            }
        });
    });
});
var confirmEmail = function (names, address) { return __awaiter(void 0, void 0, void 0, function () {
    var tickets, msg;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, mail_1["default"].setApiKey(env.SENDGRID_API_KEY)];
            case 1:
                _a.sent();
                tickets = [];
                names.forEach(function (name) {
                    for (var i = 0; i < name.quantity; i++) {
                        names.forEach(function (x) {
                            var fileName = "ticket_" + x.name + ".pdf";
                            var filePath = path_1["default"].join(__dirname, "tickets", fileName);
                            var fileContent = fs_1["default"].readFileSync(filePath, { encoding: "base64" });
                            tickets.push({
                                content: fileContent,
                                filename: fileName,
                                type: "application/pdf",
                                disposition: "attachment"
                            });
                        });
                    }
                });
                msg = {
                    from: "lewismurray78@gmail.com",
                    to: address,
                    subject: "ticket",
                    text: "htbx ticket",
                    attachments: tickets
                };
                return [4 /*yield*/, mail_1["default"].send(msg)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
