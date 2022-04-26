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
                function proxyHandler(name, handler, config) {
                    let setup = handler.proxy.setup(name, config, {});
                    // {
                    //     "error": function (err, req, res) {
                    //         res.writeHead(500, {
                    //             'Content-Type': 'text/plain'
                    //         });
                    //         res.end('Something went wrong. And we are reporting a custom error message.');
                    //     },
                    //     "open": function (proxySocket) {
                    //         // listen for messages coming FROM the target here
                    //         proxySocket.on('data', (data) => { });
                    //     },
                    //     "proxyRes": function (proxyRes, req, res) {
                    //         console.log('RAW Response from the target', JSON.stringify(proxyRes.headers, true, 2));
                    //         var body = [];
                    //         proxyRes.on('data', function (chunk) {
                    //             body.push(chunk);
                    //         });
                    //         proxyRes.on('end', function () {
                    //             body = Buffer.concat(body).toString();
                    //             console.log("Response from proxied server:", body);
                    //             res.end("My response to cli");
                    //         });
                    //     },
                    //     "close": function (res, socket, head) {
                    //         // view disconnected websocket connections
                    //         console.log('Client disconnected');
                    //     }
                    // }
                    let proxy = handler.proxy.serve(configKeys[i]);
                    return function (req, res) {
                        proxy.proxy.web(req, res);
                    }
                }
                app.use("/" + configKeys[i], proxyHandler(configKeys[i], cgijs.proxy(), configs[configKeys[i]]));
            }
            resolve({ app: app });
        } catch (e) {
            console.log("Error occured in proxy recursive ", e.toString())
            reject({ error: e });
        }
    });
    return pr;
}
