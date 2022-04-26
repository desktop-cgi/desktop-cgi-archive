'use strict';

const os = require("os");
const fs = require("fs");
const express = require("express");
const cgijs = require("cgijs");

// Basic Docs
// https://www.npmjs.com/package/http-proxy

module.exports = () => {
    let pr = new Promise(function (resolve, reject) {
        const ostype = os.type();
        let configurations;

        if (ostype == "win32" || ostype === "Windows_NT") {
            configurations = JSON.parse(fs.readFileSync('./server/config-win.json'));
        } else if (ostype == "linux" || ostype ==="debian" || ostype === "fedora") {
            configurations = JSON.parse(fs.readFileSync('./server/config-linux.json'));
        } else if (ostype == "mac") {
            configurations = JSON.parse(fs.readFileSync('./server/config-mac.json'));
        }

        let configs = configurations.proxies;
        let configKeys = Object.keys(configs);
        let confLen = configKeys.length;
        let app = express();
        try {
            for (let i = 0; i < confLen; i++) {
                function wsProxyHandler(name, handler, config) { 
                    
                }
                app.use("/" + configKeys[i], wsProxyHandler(configKeys[i], cgijs.proxy(), configs[configKeys[i]]));
            }
            resolve({ app: app });
        } catch (e) {
            console.log("Error occured in proxy recursive ", e.toString())
            reject({ error: e });
        }
    });
    return pr;
}
