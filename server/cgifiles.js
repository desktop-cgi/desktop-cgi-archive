'use strict';

module.exports = () => {
    let pr = new Promise(function (resolve, reject) {
        try {
            const fs = require('fs');
            const express = require('express');
            const cgijs = require("cgijs");
            const path = require("path");

            var cgi = cgijs.init();
            var app = express();
            let conf = fs.readFileSync('./server/config.json');
            let configuration = JSON.parse(conf);
            let cgifiles = Object.keys(configuration.cgifiles);

            // TODO:
            //      Check functionality with running proxy
            //      Write Tests
            for (let i = 0; i < cgifiles.length; i++) {
                let inst = configuration.cgifiles[cgifiles[i]];
                app.use(
                    inst.path,
                    cgi.serve(
                        inst.lang_type, {
                            web_root_folder: inst.web_root_folder, 
                            bin: inst.bin, 
                            config_path: inst.config_path, 
                            host: inst.host, 
                            port: inst.port, 
                            cmd_options: inst.cmd_options 
                        })
                    );
            }

            resolve(app);
        } catch (e) {
            
            reject(e);
        }
    });
    return pr;
}
