'use strict';

const fs = require('fs');
const express = require('express');
const cgijs = require("cgijs");
const path = require("path");
const url = require("url");
let cUtils = cgijs.utils();

module.exports = () => {
    let pr = new Promise(function (resolve, reject) {
        try {
            let ostype = cUtils.os.get();

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
            let configurations;
            
            if (ostype == "win32" || ostype === "Windows_NT") {
                configurations = JSON.parse(fs.readFileSync(path.join(__dirname, "../", '/www/configs/config-win_demo.json')));
            } else if (ostype == "linux") {
                configurations = JSON.parse(fs.readFileSync(path.join(__dirname, "../", '/www/configs/config-linux_demo.json')));
            } else if (ostype == "mac") {
                configurations = JSON.parse(fs.readFileSync(path.join(__dirname, "../", '/www/configs/config-mac_demo.json')));
            }
            
            let cgifiles = Object.keys(configurations.cgifiles);

            for (let i = 0; i < cgifiles.length; i++) {
                let inst = configurations.cgifiles[cgifiles[i]];
                // Check this again for use / all / specific method
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
