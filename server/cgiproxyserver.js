// License: MIT
// Dynamic CGI serving using dynamic path imports for 
//      CGI supporting executable for Interpreted languages Embedded Distribution
// Contribution: 2018 Ganesh K. Bhat <ganeshsurfs@gmail.com> 
// 


'use strict';

module.exports = () => {
    let pr = new Promise(function (resolve, reject) {
        try {
            var express = require('express');
            var cgijs = require("cgijs");
            var cgi = cgijs.init();

            // var cgi = require("cgijs");
            var path = require("path");

            var app = express();

            let php = path.join("www/php");
            let rby = path.join("www/ruby");
            let pl = path.join("www/perl");
            let py = path.join("www/py");
            let sport = 9090, shost = '127.0.0.1';

            // PHP File: Use bin as string
            app.use("/php", cgi.serve('php', { web_root_folder: php, bin: '/usr/bin/', config_path: '', host: shost, port: sport, cmd_options: {} }));
            // PHP File: Use bin as object definition
            app.use("/phpud", cgi.serve('php', { web_root_folder: php, bin: { bin_path: '', useDefault: true }, config_path: '', host: shost, port: sport, cmd_options: {} }));
            // PHP File: Use bin as Object definition with useDefault false
            app.use("/phpnud", cgi.serve('php', { web_root_folder: php, bin: { bin_path: '/usr/bin/', useDefault: false }, config_path: '', host: shost, port: sport, cmd_options: {} }));

            // RB File
            app.use("/rb", cgi.serve('rb', { web_root_folder: rby, bin: '/usr/bin/', config_path: '', host: shost, port: sport, cmd_options: {} }));
            // RB File
            app.use("/rbud", cgi.serve('rb', { web_root_folder: rby, bin: { bin_path: '/usr/bin/', useDefault: true }, config_path: '', host: shost, port: sport, cmd_options: {} }));

            // PLC File
            app.use("/plc", cgi.serve('plc', { web_root_folder: pl, bin: { bin_path: '/usr/bin/', useDefault: true }, config_path: '', host: shost, port: sport, cmd_options: {} }));
            // PLD File
            app.use("/pld", cgi.serve('pld', { web_root_folder: pl, bin: { bin_path: '/usr/bin/', useDefault: true }, config_path: '', host: shost, port: sport, cmd_options: {} }));
            // PL File
            app.use("/pl", cgi.serve('pl', { web_root_folder: pl, bin: { bin_path: '/usr/bin/', useDefault: true }, config_path: '', host: shost, port: sport, cmd_options: {} }));

            // PYTHON File
            app.use("/py", cgi.serve('py', { web_root_folder: py, bin: { bin_path: '/usr/bin/', useDefault: true }, config_path: '', host: shost, port: sport, cmd_options: {} }));
            // PYTHON3 File
            app.use("/py3", cgi.serve('py3', { web_root_folder: py, bin: { bin_path: '/usr/bin/', useDefault: true }, config_path: '', host: shost, port: sport, cmd_options: {} }));

            app.use("*", function (req, res) {
                res.send(`
                    "Testing my server"
                `);
            });

            app.listen(sport, shost);
            console.log(`Server listening at ${sport}!`);
            resolve(app)
        } catch (e) {
            reject(e);
        }
    });
    return pr;
}




// // Run flask application
// FLASK_APP=./www/py/main.py FLASK_ENV=development flask run
