'use strict';

const express = require("express");
const cgijs = require("cgijs");
let cUtils = cgijs.utils();

// Basic Docs
// https://www.npmjs.com/package/http-proxy

module.exports = (dirname,  configurations, options, data={}) => {
    let pr = new Promise(function (resolve, reject) {

        try {
            
            resolve({  });
        } catch (e) {
            console.log("Desktop-CGI-Express Bridge: recursive-files.js: Error occured in files recursive # ", e.toString());
            reject({ error: e });
        }
    });
    return pr;
}
