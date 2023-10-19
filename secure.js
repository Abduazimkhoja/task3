const crypto = require("crypto-js");

module.exports.generateKey = function () {
   return crypto.lib.WordArray.random(256 / 8);
};

module.exports.getHMAC = function (key, message) {
   return crypto.HmacSHA256(message, key).toString();
};
