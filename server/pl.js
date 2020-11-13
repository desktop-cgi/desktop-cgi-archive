'use strict';

module.exports = () => {
    let pr = new Promise(function (resolve, reject) {
        try {
            const express = require('express');
            const cgijs = require("cgijs");
            const path = require("path");
            var cgi = cgijs.init();
            var app = express();

            resolve(app)
        } catch (e) {
            reject(e);
        }
    });
    return pr;
}
