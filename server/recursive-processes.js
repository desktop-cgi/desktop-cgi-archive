'use strict';

const os = require("os");
const fs = require("fs");
const express = require("express");
const cgijs = require("cgijs");
const path = require("path");
let cUtils = cgijs.utils();

// Basic Docs
// https://www.npmjs.com/package/http-proxy


module.exports = () => {
    let pr = new Promise(function (resolve, reject) {

        const ostype = cUtils.os.get();
        let configurations;
        let processes = [];

        let conf = require("./processes/templatespawn.json");

        if (ostype == "win32" || ostype === "Windows_NT") {
            configurations = JSON.parse(fs.readFileSync(path.join(__dirname, "../", '/www/configs/config-win_demo.json')));
        } else if (ostype == "linux") {
            configurations = JSON.parse(fs.readFileSync(path.join(__dirname, "../", '/www/configs/config-linux_demo.json')));
        } else if (ostype == "mac") {
            configurations = JSON.parse(fs.readFileSync(path.join(__dirname, "../", '/www/configs/config-mac_demo.json')));
        }

        let procs = Object.keys(configurations.processes);
        let procsLength = procs.length;

        for (let i = 0; i < procsLength; i++) {
            // STEP 1: Get the process
            let process;
            let name = procs[i];
            let processConf = configurations.processes[name];
            let cnf = Object.assign({}, conf);
            cnf.name = name;
            cnf.cmds.run.exe = "node";
            cnf.os = ostype;

            // STEP 2: Start the process as a seperate thread
            if (!!processConf.path) {
                // .path -> .JS File from the folder in the {.path} file

                let filePath = path.join(__dirname, processConf.path);
                cnf.cmds.run.args.push(filePath);
            } else if (!!processConf.type) {
                // .type -> Get JSON file from www/processes folder with the name {type}.json file

                let argJson = path.join(__dirname, "../www/processes", processConf.type + ".json");
                cnf.cmds.run.args.push("./processes/process.js", "-j", argJson);
            } else if (!!processConf.config) {
                // .json -> parse json config from the specified .json file path 

                cnf.cmds.run.args.push("./processes/process.js", "-j", processConf.config);
            } else if (!!processConf.cgiprocess) {
                // Complete config in desktopcgi json in config-win_demo.json

                let filePath = path.join(__dirname, "../", processConf.cgiprocess);
                cnf.cmds.run.args.push(filePath);
            } else if (!!processConf.cmds && !!processConf.name) {
                // Complete config in desktopcgi json in config-win_demo.json

                cnf.cmds.run.args.push("./processes/process.js", "-c", processConf.toString());
            } else {
                // Throwing error since the keys were not defined correctly
                throw Error("server:recursive-processes.js: DesktopCGI config is not defined correctly in the key", name);
            }

            //  STEP 3: Run the spawn using config
            process = require("./processes/base")(cnf);
            //  STEP 4: Add spawned process to the array
            processes.push({ name, process });
        }

        try {
            resolve({ processes: processes });
        } catch (e) {
            console.log("Error occured in files recursive ", e.toString());
            reject({ error: e });
        }
    });
    return pr;
}
