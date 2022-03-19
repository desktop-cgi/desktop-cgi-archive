'use strict';

const { app } = require('electron');

module.exports = () => {
    let pr = new Promise(function (resolve, reject) {
        try {
            // Load The FS Module & The Config File
            var express = require('express');
            var path = require("path");
            // var bodyParser = require('body-parser');
            var app = express();

            const proxies = require("./cgifiles");
            const cgifiles = require("./proxy");

            proxies().then(function (proxyapp) {
                
                app.use(proxyapp);

                app.use('/assets', express.static(path.join(__dirname, '/www/ui/assets')))
                app.set('view engine', 'ejs');

                cgifiles().then(function (cgifilesapp) {
                    app.use(cgifilesapp);

                    app.use("/", function (req, res) {
                        res.render('../www/ui/index');
                    });

                    app.use("*", function (req, res) {
                        res.send(`"Testing my server"`);
                    });

                    app.listen(3001, '127.0.0.1', function () {
                        console.log(`Server listening at 3001`);
                        resolve(app);
                    });
                }.bind(app), function (err) {
                    reject(err);
                }).catch(function (error) {
                    console.log(error);
                });

            }.bind(app), function (err) {
                reject(err);
            });

        } catch (e) {
            reject(e);
        }
    });
    return pr;
}

