"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTicket = void 0;
var Qrcode = require("qrcode");
var path = require("path");
var createTicket = function (data) {
    var str = JSON.stringify(data);
    var filename = "ticket".concat(data === null || data === void 0 ? void 0 : data.id, ".png");
    var filePath = path.join(__dirname, "tickets", filename);
    Qrcode.toFile(filePath, str, function (err, url) {
        if (err)
            console.log("error", "\u2718 ".concat(err));
    });
};
exports.createTicket = createTicket;
