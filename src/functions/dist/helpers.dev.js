"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchFromAPI = fetchFromAPI;
exports.validateEmail = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var API = process.env.REACT_APP_API_URL;

function fetchFromAPI(endpointURL, opts) {
  var _method$body$opts, method, body, res;

  return regeneratorRuntime.async(function fetchFromAPI$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _method$body$opts = _objectSpread({
            method: "POST",
            body: null
          }, opts), method = _method$body$opts.method, body = _method$body$opts.body;
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch("".concat(API, "/").concat(endpointURL), {
            method: method,
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json"
            }
          }));

        case 3:
          res = _context.sent;
          return _context.abrupt("return", res.json());

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}

var validateEmail = function validateEmail(email) {
  // Using regex pattern for email validation
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

exports.validateEmail = validateEmail;