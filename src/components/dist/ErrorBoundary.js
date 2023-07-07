"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.ErrorBoundary = void 0;
var react_1 = require("react");
var ErrorBoundary = /** @class */ (function (_super) {
    __extends(ErrorBoundary, _super);
    function ErrorBoundary() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErrorBoundary.prototype.componentDidCatch = function (error, errorInfo) {
        var _a;
        if (errorInfo && errorInfo.componentStack) {
            // The component stack is sometimes useful in development mode
            // In production it can be somewhat obfuscated, so feel free to omit this line.
            console.log(errorInfo.componentStack);
        }
        var trackjs = (_a = window) === null || _a === void 0 ? void 0 : _a.TrackJS;
        trackjs && trackjs.track(error);
        this.setState({ error: error });
    };
    ErrorBoundary.prototype.render = function () {
        var _a;
        if ((_a = this.state) === null || _a === void 0 ? void 0 : _a.error) {
            return (React.createElement("h1", { style: { color: "white" } }, "Something has gone wrong try and refresh this page"));
        }
        return this.props.children;
    };
    return ErrorBoundary;
}(react_1.Component));
exports.ErrorBoundary = ErrorBoundary;
