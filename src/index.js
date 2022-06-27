'use strict';

const path = require("path");

module.exports = (dirname, configurations, options) => {
    let pr = new Promise(async function (resolve, reject) {
        try {
            // Load The FS Module & The Config File
            var express = require('express');

            // var bodyParser = require('body-parser');
            var app = express();

            const cgifiles = require("./modules_recursive/recursive-cgifiles");
            const proxies = require("./modules_recursive/recursive-proxies");
            const processes = require("./modules_recursive/recursive-processes");
            let stores = {};

            processes(dirname, configurations, options).then(function (procs) {

                console.log("DesktopCGI-Express Bridge: index.js: Started Processes ");
                console.log("DesktopCGI-Express Bridge: index.js: Starting Proxies");

                stores["processes"] = procs;

                proxies(dirname, configurations, options).then(function (proxyapp) {

                    console.log("DesktopCGI-Express Bridge: index.js: Started Proxies");

                    stores["proxies"] = proxyapp;

                    if (!!configurations.app.options.assets) {
                        app.use('/assets', express.static(path.join(dirname, configurations.app.options.assets)))
                    }
                    if (!!configurations.app.options.views) {
                        app.set('views', path.join(dirname, configurations.app.options.views));
                    }
                    if (!!configurations.app.options.viewengine) {
                        app.set('view engine', configurations.app.options.viewengine);
                    }

                    for (let i = 0; i < proxyapp.length; i++) {
                        // Check this again for use / all / specific method
                        app.use("/" + proxyapp[i].key, proxyapp[i].value);
                    }

                    console.log("DesktopCGI-Express Bridge: index.js: Starting CGI Files Routes");

                    cgifiles(dirname, configurations, options).then(async function (cgifilesapp) {

                        console.log("DesktopCGI-Express Bridge: index.js: Started CGI Files Routes");

                        stores["cgifiles"] = cgifilesapp;

                        // Check this again for use / all / specific method
                        app.use("/cgi", cgifilesapp);

                        if (configurations.server.app === "demo") {
                            let demoapp = await require("./demoapproutes")(dirname, configurations);
                            app.use("/", demoapp);
                        } else {
                            app.get("/", function (req, res, next) {
                                res.redirect(configurations.server.redirect_home);
                            });
                        }

                        app.all("*", function (req, res, next) {
                            res.send("Desktop-CGI-Express Bridge: " + req.path + " - /* path: Testing my server");
                        });

                        app.listen(configurations.server.port, configurations.server.host, function () {
                            console.log(`Desktop-CGI-Express Bridge: index.js: Server listening at ` + configurations.server.port);
                            resolve({ app: app, stores: stores });
                        }.bind(app));

                    }.bind(app)).catch(function (error) {
                        // throw new Error(error.toString());
                        console.log("Desktop-CGI-Express Bridge: index.js: Error - ", error.toString());
                        reject({ err: err });
                    });

                }.bind(app), function (err) {
                    // throw new Error(err.toString());
                    console.log("Desktop-CGI-Express Bridge: index.js: ", err.toString());
                    reject(err);
                }).catch(function (error) {
                    // throw new Error(error.toString());
                    console.log("Desktop-CGI-Express Bridge: index.js: ", error.toString());
                    reject(error);
                });

            }).catch(function (e) {
                // throw new Error(e.toString());
                console.log("Desktop-CGI-Express Bridge: index.js: ", e.toString());
                reject(e);
            });

        } catch (e) {
            // throw new Error(e.toString());
            console.log("Desktop-CGI-Express Bridge: index.js: ", e.toString());
            reject(e);
        }
    });
    return pr;
}

