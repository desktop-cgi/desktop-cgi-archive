/**
 * 
 * Web and websocket
 * 
 * // Basic Docs
 * // https://www.npmjs.com/package/http-proxy
 * 
 */


'use strict';

module.exports = function (name, config) {
    const cgijs = require("cgijs");
    const express = require("express");
    let app = express();
    try {
        function proxyHandler(name, handler, config) {
            let cKeys = Object.keys(config);
            if (!cKeys.includes("xfwd")) { config["xfwd"] = true; }
            if (!cKeys.includes("toProxy")) { config["toProxy"] = true; }
            if (!cKeys.includes("changeOrigin")) { config["changeOrigin"] = true; }
            if (!cKeys.includes("preserveHeaderKeyCase")) { config["preserveHeaderKeyCase"] = true; }
            if (!cKeys.includes("cookieDomainRewrite")) {
                if (typeof config.options.target === "string") {
                    config["cookieDomainRewrite"] = config.options.target;
                } else if (typeof config.options.target === "object") {
                    config["cookieDomainRewrite"] = config.options.target.host + ":" + config.options.target.port.toString();
                }
            }
            if (!cKeys.includes("ws")) { config["ws"] = false; }

            let setup = handler.proxy.setup(name, config, {});
            let proxy = handler.proxy.serve(name);

            return function (req, res) {
                proxy.proxy.web(req, res);
            }
        }

        let fnHandler = cgijs.proxy();
        app.use("*", proxyHandler(name, fnHandler, config));
        if (config.ws === true) {
            function upgradeHandler(req, socket, head) {
                let p = fnHandler.proxy.get(name);
                p.proxy.ws(req, socket, head);
            }
            app.on("upgrade", upgradeHandler);
        }
        return { app: app };
    } catch (e) {
        console.log("Error occured in proxy recursive ", e.toString())
        return { error: e };
    }
}
