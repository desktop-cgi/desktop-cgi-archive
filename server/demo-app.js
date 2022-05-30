
'use strict';

const fs = require('fs');
const url = require('url');
const os = require("os");
const path = require("path");
const express = require("express");
const cgijs = require("cgijs");
let cUtils = cgijs.utils();

// Basic Docs
// https://www.npmjs.com/package/http-proxy


module.exports = () => {
    let pr = new Promise(function (resolve, reject) {
        const ostype = cUtils.os.get();
        let configurations;
        let app = express();

        if (ostype == "win32" || ostype === "Windows_NT") {
            configurations = JSON.parse(fs.readFileSync(path.join(__dirname, "../", '/www/configs/config-win_demo.json')));
        } else if (ostype == "linux") {
            configurations = JSON.parse(fs.readFileSync(path.join(__dirname, "../", '/www/configs/config-linux_demo.json')));
        } else if (ostype == "mac") {
            configurations = JSON.parse(fs.readFileSync(path.join(__dirname, "../", '/www/configs/config-mac_demo.json')));
        }

        if (!!configurations.server.options.assets) {
            app.use('/assets', express.static(path.join(__dirname, "../", configurations.server.options.assets)))
        }
        if (!!configurations.server.options.views) {
            app.set('views', path.join(__dirname, "../", configurations.server.options.views));
        }
        if (!!configurations.server.options.viewengine) {
            app.set('view engine', configurations.server.options.viewengine);
        }

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

        try {
            resolve({ app: app });
        } catch (e) {
            console.log("Error occured in files recursive ", e.toString());
            reject({ error: e });
        }
    });
    
    return pr;
}

