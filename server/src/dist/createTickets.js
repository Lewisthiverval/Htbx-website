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
exports.createTickets = exports.createTicket = void 0;
var pdfkit_1 = require("pdfkit");
var qrcode_1 = require("qrcode");
var path_1 = require("path");
var fs_1 = require("fs");
exports.createTicket = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var doc, qrCodeData, ticketsDir, qrCodePath, pdfPath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                doc = new pdfkit_1["default"]();
                qrCodeData = "Your ticket data";
                ticketsDir = path_1["default"].join(__dirname, "tickets");
                if (!fs_1["default"].existsSync(ticketsDir))
                    fs_1["default"].mkdirSync(ticketsDir, { recursive: true });
                qrCodePath = path_1["default"].join(ticketsDir, data.name + "qrcode.png");
                return [4 /*yield*/, qrcode_1["default"].toFile(qrCodePath, qrCodeData)];
            case 1:
                _a.sent();
                pdfPath = path_1["default"].join(ticketsDir, "ticket_" + data.name + ".pdf");
                console.log(pdfPath);
                doc.pipe(fs_1["default"].createWriteStream(pdfPath));
                doc.image(qrCodePath, { width: 200, align: "center" });
                doc.moveDown();
                doc.fontSize(16).text("" + data.name);
                doc.moveDown();
                doc
                    .fontSize(8)
                    .text("This ticket is non-transferable, meant only for members named on the ticket type, their +1s, or other invited guests. You cannot sell or give your ticket to anyone else, doing so will result in that person being denied entry.");
                doc.moveDown();
                doc
                    .fontSize(8)
                    .text("If you can no longer attend and have purchased a ticket, please e-mail htbxlondon@gmail.com to be issued a full refund, applicable until 48 hours before the party.");
                doc.moveDown();
                doc.moveDown();
                doc.fontSize(12).text("NO photography is allowed");
                doc.fontSize(12).text("18+ / bring ID");
                doc.moveDown();
                doc.fontSize(12).text("16th July 2023");
                doc.fontSize(12).text("12:00 - 00:00");
                doc.moveDown();
                doc.fontSize(12).text("Address:");
                doc.fontSize(12).text("SET Woolwich");
                doc.fontSize(12).text("SE18 6LS");
                doc.fontSize(12).text("Entrance via Bunton Street");
                doc.end();
                return [2 /*return*/];
        }
    });
}); };
exports.createTickets = function (names) { return __awaiter(void 0, void 0, void 0, function () {
    var fileCreationPromises, i, data, promise;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fileCreationPromises = [];
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < names.length)) return [3 /*break*/, 4];
                data = { name: names[i].name };
                return [4 /*yield*/, exports.createTicket(data)];
            case 2:
                promise = _a.sent();
                fileCreationPromises.push(promise);
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4: return [4 /*yield*/, Promise.all(fileCreationPromises)];
            case 5:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
