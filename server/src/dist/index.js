"use strict";
exports.__esModule = true;
var dotenv_1 = require("dotenv");
if (process.env.NODE_ENV !== "production")
    dotenv_1.config();
var api_1 = require("./api");
var port = process.env.PORT || 3001;
api_1.app.listen(port, function () {
    return console.log("API available on http://localhost:" + port);
});
