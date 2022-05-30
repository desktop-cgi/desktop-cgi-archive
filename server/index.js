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
                configurations = JSON.parse(fs.readFileSync(path.join(__dirname, '../server/configs/config-win_demo.json')));
            } else if (ostype == "linux") {
                configurations = JSON.parse(fs.readFileSync(path.join(__dirname, '../server/configs/config-linux_demo.json')));
            } else if (ostype == "mac") {
                configurations = JSON.parse(fs.readFileSync(path.join(__dirname, '../server/configs/config-mac_demo.json')));
            }

            proxies().then(function (proxyapp) {

                app.use('/assets', express.static(path.join(__dirname, '/www/ui/assets')))
                app.set('views', path.join(__dirname, '../www/ui/node'));
                app.set('view engine', 'ejs');

                for (let i = 0; i < proxyapp.length; i++) {
                    // Check this again for use / all / specific method
                    app.use("/" + proxyapp[i].key, proxyapp[i].value);
                }

                cgifiles().then(function (cgifilesapp) {
                    // Check this again for use / all / specific method
                    app.use("/cgifiles", cgifilesapp);

                    app.get("/monitor/app", function (req, res) {
                        res.render(path.join('/www/ui/monitor'));
                    });

                    app.get("/monitor/processes", function (req, res) {
                        res.render(path.join('processes'));
                    });

                    app.get("/test", function (req, res, next) {
                        res.render(path.join('servertest'));
                    });

                    app.get("/language", function (req, res, next) {
                        const queryObject = url.parse(req.url, true).query;

                        let cgilinks = configurations.cgifiles, links = [];
                        let cgikeys = Object.keys(cgilinks);

                        for (let i = 0; i < cgikeys.length; i++) {
                            links.push({
                                label: cgilinks[cgikeys[i]].label ? cgilinks[cgikeys[i]].label.toUpperCase() : cgikeys[i].toUpperCase(),
                                identity: cgilinks[cgikeys[i]].identity,
                                link: cgilinks[cgikeys[i]].path,
                                language: cgilinks[cgikeys[i]].lang_type,
                                host: cgilinks[cgikeys[i]].host,
                                host: cgilinks[cgikeys[i]].port
                            });
                        }
                        res.render(path.join('language'), { data: { language: queryObject.language, links: links } });
                    });

                    app.get("/", function (req, res, next) {
                        res.render(path.join('index'));
                    });

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

