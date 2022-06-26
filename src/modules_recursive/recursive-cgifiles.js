'use strict';

const express = require('express');
const cgijs = require("cgijs");
const path = require("path");
const url = require("url");
let cUtils = cgijs.utils();

module.exports = (dirname,  configurations, options, data={}) => {
    let pr = new Promise(function (resolve, reject) {
        console.log("DesktopCGI-Express Bridge: recursive-cgifiles.js: Starting CGI Files ");
        try {

            function response(type, exeOptions) {
                let cgi = cgijs.init();
                return function (req, res, next) {
                    let requestObject = {
                        url: url.parse(req.originalUrl),
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
            let cgifiles = Object.keys(configurations.cgifiles);

            for (let i = 0; i < cgifiles.length; i++) {
                let inst = configurations.cgifiles[cgifiles[i]];
                // Check this again for use / all / specific method
                app.use(
                    inst.path,
                    response(
                        inst.script_lang_type,
                        {
                            web_root_folder: path.join(dirname, inst.script_web_root_folder),
                            bin: path.join(dirname, (typeof inst.embed_bin === "string") ? inst.embed_bin : inst.embed_bin.bin_path),
                            config_path: (!!inst.embed_config.file) ? inst.embed_config.file : inst.embed_config.file,
                            host: inst.script_server.host,
                            port: inst.script_server.port,
                            cmd_options: inst.script_cmd_options
                        }
                    )
                );
            }
            
            console.log("Desktop-CGI-Express Bridge: recursive-cgifiles.js: Started files recursive ");
            resolve(app);
        } catch (e) {
            // throw new Error(e);
            console.log("Desktop-CGI-Express Bridge: recursive-cgifiles.js: Error occured in files recursive # ", e.toString());
            reject(e);
        }
    });
    return pr;
}
