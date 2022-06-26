/**
 * Utils
 * 
 * 
 */

var CryptoJS = require("crypto-js");

function encrypt(data, pass) {
    // var data = [{id: 1}, {id: 2}];
    return CryptoJS.AES.encrypt(JSON.stringify(data), pass || "testpass").toString();
}

function decrypt(ciphertext, pass) {
    return JSON.parse(CryptoJS.AES.decrypt(ciphertext, pass || "testpass").toString(CryptoJS.enc.Utf8));
}

module.exports = {
    "encrypt": encrypt,
    "decrypt": decrypt
}
