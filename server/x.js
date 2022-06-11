
'use strict';

const os = require("os");
const fs = require("fs");
const express = require("express");
const cgijs = require("cgijs");
const path = require("path");
let cUtils = cgijs.utils();

// Basic Docs
// https://www.npmjs.com/package/http-proxy

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
    let process;
    let name = procs[i];
    let processConf = configurations.processes[name];
    let cnf = Object.assign({}, conf);
    cnf.name = name;
    cnf.cmds.run.exe = "node";
    cnf.os = ostype;
    console.log("Testing function", i);
    
    let argJson = require(path.join(__dirname, "../www/processes", processConf.type + ".json"));
    argJson.other.command = "startbatwin32";
    cnf.cmds.run.args.push("./processes/process.js", "-c", JSON.stringify(argJson));
    

    //  STEP 3: Run the spawn using config
    process = require("./processes/base")(cnf);
    
    //  STEP 4: Add spawned process to the array
    processes.push({ name, process });
}

