'use strict';

const path = require("path");
const express = require("express");
const cgijs = require("cgijs");
let cUtils = cgijs.utils();

// Basic Docs
// https://www.npmjs.com/package/http-proxy


module.exports = (dirname, configurations, options, data={}) => {
    let pr = new Promise(function (resolve, reject) {
        console.log("DesktopCGI-Express Bridge: recursive-processes.js: Starting Processes ");
        try {
            let processes = [];
            let procs = Object.keys(configurations.processes);
            let procsLength = procs.length;

            for (let i = 0; i < procsLength; i++) {
                // STEP 1: Get the process

                let process;
                let name = procs[i];
                let processConf = configurations.processes[name];
                let base = require("../modules_processes").base;
                
                // STEP 2: Start the process as a seperate thread
                if (!!processConf.path) {
                    // .path -> .JS File from the folder in the {.path} file

                    let filePath = path.join(dirname, processConf.path);
                    //  STEP 3: Run the spawn using config
                    process = require(filePath);

                } else if (!!processConf.type) {
                    // .type -> Get predefined JSON file from www/processes folder with the name {type}.json file

                    let argJson = path.join(dirname, "src/process_configs", processConf.type + ".json");
                    process = base(require(argJson));

                } else if (!!processConf.config) {
                    // .json -> parse json config from the specified .json file path 

                    if (!processConf.config.includes(".json")) {
                        processConf.config += ".json";
                    }
                    let argJson = processConf.config;
                    process = base(require(argJson));

                } else if (!!processConf.cgiprocess) {
                    // Complete config in desktopcgi json in config-win_demo.json

                    let filePath = path.join(dirname, processConf.cgiprocess);
                    process = base(require(filePath));

                } else if (!!processConf.cmds && !!processConf.name) {
                    // Complete config in desktopcgi json in config-win_demo.json

                    process = base(processConf);

                } else {
                    // Throwing error since the keys were not defined correctly
                    throw Error("Desktop-CGI-Express Bridge: recursive-processes.js: DesktopCGI config is not defined correctly in the key # ", name);
                }

                //  STEP 4: Add spawned process to the array
                processes = { [name]: process, ...processes };
            }

            console.log("Desktop-CGI-Express Bridge: recursive-processes.js: Started all processes in recursive_processes ");
            resolve(processes);
        } catch (e) {
            console.log("Desktop-CGI-Express Bridge: recursive-processes.js: Error occured in files recursive # ", e.toString());
            reject({ error: e });
        }
    });
    return pr;
}
