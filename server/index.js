'use strict';

const { app } = require('electron');

module.exports = () => {
    let pr = new Promise(function (resolve, reject) {
        try {
            // Load The FS Module & The Config File
            const fs = require('fs');
            var express = require('express');
            var app = express();

            // Load The Path Module
            const path = require('path');
            var cgijs = require("cgijs");
            const srv = require("./cgiproxyserver");

            var cgi = cgijs.init();

            let config = {
                proxy_host: 'http://127.0.0.1',
                proxy_port: 8000,
                base_host: 'http://127.0.0.1',
                base_port: 9090,
                base_url: '/*',
                https: {
                    key: null,
                    cert: null
                }
            };

            function proxyHandler(cgijs, config) {
                let h = cgijs.handler();
                const conn = h.proxy.start({}, config);
                // h.setter.connection({config.cbase + config.cport.toString(): conn});
                console.log(`Proxy Serving at `, config.proxy_port);
                return h.proxy.setup(h, config, h.proxy.serve);
            }
            
            // Subsystem for proxyHandler
            app.use("/", proxyHandler(cgijs, config));
            
            
            srv().then(function (proxyapp) {
                app.listen(3001, '127.0.0.1', function () {
                    console.log(`Server listening at 3001`);
                    resolve({
                        "sampleapp": app,
                        "proxyapp": proxyapp
                    });
                });
            }.bind(app, config), function (err) {
                reject(err);
            })

        } catch (e) {
            reject(e);
        }
    });
    return pr;
}

