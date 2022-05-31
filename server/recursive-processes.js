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
            // Get the process
            let processConf = configurations.processes[procs[i]];
            let name = procs[i];
            let process;

            // Start the process as a seperate thread
            if (!!processConf.path) {
                process = require("./processes/process")(path.join(__dirname, processConf.path));
            } else if (!!processConf.type) {
                process = require(path.join(__dirname, "./processes", processConf.type));
            } else {
                process = require("./base")(processConf);
            }

            // Add to the array
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
