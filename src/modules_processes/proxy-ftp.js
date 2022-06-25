/**
 * Process script
 * 
 * Start Process script using config file or file
 * [TODO] Check alternatives of Code
 * 
 */


'use strict';

const os = require("os");
const fs = require("fs");
const cgijs = require("cgijs");

module.exports = function (name, config) {
    let app;
    try {
        
        return { app: app };
    } catch (e) {
        console.log("Error occured in proxy recursive ", e.toString())
        return { error: e };
    }
}
