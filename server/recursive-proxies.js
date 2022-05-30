'use strict';


const fs = require("fs");
const path = require("path");
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
            configurations = JSON.parse(fs.readFileSync(path.join(__dirname, '../server/configs/config-win_demo.json')));
        } else if (ostype == "linux") {
            configurations = JSON.parse(fs.readFileSync(path.join(__dirname, '../server/configs/config-linux_demo.json')));
        } else if (ostype == "mac") {
            configurations = JSON.parse(fs.readFileSync(path.join(__dirname, '../server/configs/config-mac_demo.json')));
        }

        let configs = configurations.proxies;
        let configKeys = Object.keys(configs);
        let confLen = configKeys.length;
        let app = [];
        try {
            for (let i = 0; i < confLen; i++) {
                
                let proxyType = configs[configKeys[i]].type;
                if (proxyType === "http" || proxyType === "https" || proxyType === "web") {
                    app.push({
                        "key": configKeys[i],
                        "value": require("./processes/proxy-http")(configKeys[i], configs[configKeys[i]]).app
                    });
                } else if (proxyType === "ws") {
                    app.push({
                        "key": configKeys[i],
                        "value": require("./processes/proxy-ws")(configKeys[i], configs[configKeys[i]]).app
                    });
                    // app = require("./processes/proxy-ws")(configKeys[i], configs[configKeys[i]]);
                } else if (proxyType === "udp") {

                } else if (proxyType === "tcp") {

                } else if (proxyType === "ssh") {

                } else if (proxyType === "ftp") {

                }
            }
            resolve(app);
        } catch (e) {
            console.log("Error occured in proxy recursive ", e.toString());
            reject({ error: e });
        }
    });
    return pr;
}
