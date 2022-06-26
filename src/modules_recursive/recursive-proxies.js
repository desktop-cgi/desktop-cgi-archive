'use strict';

const express = require("express");
const cgijs = require("cgijs");
let cUtils = cgijs.utils();

// Basic Docs
// https://www.npmjs.com/package/http-proxy

module.exports = (dirname,  configurations, options, data={}) => {
    let pr = new Promise(function (resolve, reject) {

        console.log("DesktopCGI-Express Bridge: recursive-proxies.js: Starting Proxies ");

        let configs = configurations.proxies;
        let configKeys = Object.keys(configs);
        let confLen = configKeys.length;
        let app = [];
        let processes = require("../modules_processes");

        try {
            for (let i = 0; i < confLen; i++) {
                
                let proxyType = configs[configKeys[i]].type;
                if (proxyType === "http" || proxyType === "https" || proxyType === "web") {
                    app.push({
                        "key": configKeys[i],
                        "value": processes.proxyhttp(configKeys[i], configs[configKeys[i]]).app
                    });
                } else if (proxyType === "ws") {
                    app.push({
                        "key": configKeys[i],
                        "value": processes.proxyws(configKeys[i], configs[configKeys[i]]).app
                    });
                } else if (proxyType === "udp") {

                } else if (proxyType === "tcp") {

                } else if (proxyType === "ssh") {

                } else if (proxyType === "ftp") {

                }
            }
            
            console.log("Desktop-CGI-Express Bridge: recursive-proxies.js: Starting proxy recursive ");
            resolve(app);
        } catch (e) {
            console.log("Desktop-CGI-Express Bridge: recursive-proxies.js: Error occured in proxy recursive ", e.toString());
            reject({ error: e });
        }
    });
    return pr;
}
