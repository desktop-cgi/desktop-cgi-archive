'use strict';

const os = require("os");
const fs = require("fs");
const express = require("express");
const cgijs = require("cgijs");
let cUtils = cgijs.utils();

// Basic Docs
// https://www.npmjs.com/package/http-proxy


module.exports = () => {
    let pr = new Promise(function (resolve, reject) {
        const ostype = cUtils.os.get();
        let configurations;

        if (ostype == "win32" || ostype === "Windows_NT") {
            configurations = JSON.parse(fs.readFileSync(path.join(__dirname, "../", '/www/configs/config-win_demo.json')));
        } else if (ostype == "linux") {
            configurations = JSON.parse(fs.readFileSync(path.join(__dirname, "../", '/www/configs/config-linux_demo.json')));
        } else if (ostype == "mac") {
            configurations = JSON.parse(fs.readFileSync(path.join(__dirname, "../", '/www/configs/config-mac_demo.json')));
        }
        
        try {
            resolve({  });
        } catch (e) {
            console.log("Error occured in files recursive ", e.toString());
            reject({ error: e });
        }
    });
    return pr;
}
