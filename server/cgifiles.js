'use strict';

module.exports = () => {
    let pr = new Promise(function (resolve, reject) {
        try {
            const fs = require('fs');
            const express = require('express');
            const cgijs = require("cgijs");
            const path = require("path");

            function response(type, exeOptions) {
                const cgijs = require("cgijs");
                // const cgijs = require("cgijs");
                let cgi = cgijs.init();
                return function (req, res, next) {
                    let requestObject = {
                        url: URL.parse(req.originalUrl),
                        originalUrl: req.originalUrl,
                        query: req.url.query,
                        method: req.method,
                        body: req.body,
                        ip: req.ip,
                        headers: req.headers
                    }
                    cgi.serve(type, requestObject, exeOptions).then(function (result) {
                        result.statusCode = (!result.statusCode) ? 200 : result.statusCode;
                        res.status(result.statusCode).send(result.response);
                    }.bind(res)).catch(function (e) {
                        e.statusCode = (!e.statusCode) ? 500 : e.statusCode;
                        res.status(e.statusCode).send(e.response);
                    });
                };
            }

            var app = express();
            let conf = fs.readFileSync('./server/config.json');
            let configuration = JSON.parse(conf);
            let cgifiles = Object.keys(configuration.cgifiles);

            for (let i = 0; i < cgifiles.length; i++) {
                let inst = configuration.cgifiles[cgifiles[i]];

                app.use(
                    inst.path,
                    response(
                        inst.type,
                        {
                            web_root_folder: inst.web_root_folder,
                            bin: inst.bin,
                            config_path: inst.config_path,
                            host: inst.host,
                            port: inst.port,
                            cmd_options: inst.cmd_options
                        }
                    )
                );
            }
            resolve(app);
        } catch (e) {
            reject(e);
        }
    });
    return pr;
}
