'use strict';

const { app } = require('electron');
const fs = require('fs');
const url = require('url');
const os = require("os");
const path = require("path");

module.exports = () => {
    let pr = new Promise(function (resolve, reject) {
        try {
            // Load The FS Module & The Config File
            var express = require('express');

            // var bodyParser = require('body-parser');
            var app = express();

            const cgifiles = require("./recursive-cgifiles");
            const proxies = require("./recursive-proxies");

            const ostype = os.type();
            let configurations;

            if (ostype == "win32" || ostype === "Windows_NT") {
                configurations = JSON.parse(fs.readFileSync(path.join(__dirname, "../", '/www/configs/config-win_demo.json')));
            } else if (ostype == "linux") {
                configurations = JSON.parse(fs.readFileSync(path.join(__dirname, "../", '/www/configs/config-linux_demo.json')));
            } else if (ostype == "mac") {
                configurations = JSON.parse(fs.readFileSync(path.join(__dirname, "../", '/www/configs/config-mac_demo.json')));
            }

            proxies().then(function (proxyapp) {

                if (!!configurations.server.options.assets) {
                    app.use('/assets', express.static(path.join(__dirname, "../", configurations.server.options.assets)))
                }
                if (!!configurations.server.options.views) {
                    app.set('views', path.join(__dirname, "../", configurations.server.options.views));
                }
                if (!!configurations.server.options.viewengine) {
                    app.set('view engine', configurations.server.options.viewengine);
                }

                for (let i = 0; i < proxyapp.length; i++) {
                    // Check this again for use / all / specific method
                    app.use("/" + proxyapp[i].key, proxyapp[i].value);
                }

                cgifiles().then(async function (cgifilesapp) {
                    // Check this again for use / all / specific method
                    app.use("/cgifiles", cgifilesapp);

                    if (configurations.server.app === "demo") {
                        let demoapp = await require("./demoapproutes")();
                        app.use("/", demoapp.app);
                    } else {
                        app.get("/", function (req, res, next) {
                            res.redirect(configurations.server.redirect_home);
                        });
                    }

                    app.all("*", function (req, res, next) {
                        res.send(`"Testing my server"`);
                    });

                    app.listen(configurations.server.port, configurations.server.host, function () {
                        console.log(`Server listening at ` + configurations.server.port);
                        resolve(app);
                    });

                }.bind(app), function (err) {
                    reject(err);
                }).catch(function (error) {
                    console.log(error);
                });

            }.bind(app), function (err) {
                reject(err);
            }).catch(function (error) {
                reject(error);
            });

        } catch (e) {
            reject(e);
        }
    });
    return pr;
}

