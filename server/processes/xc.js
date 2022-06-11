const path = require("path");
const process = require("process");
let conf = require("./templatespawn.json");
let jsfile = { "path": "../../www/processes/process-script.js" };
let cgiprocess = { "cgiprocess": "../../www/demoapp/files/node/ls.js" };
let config = { "config": "../../www/processes/httpd.json" };
let httpd = { "type": "httpd" };
let procConfig = require("../../www/processes/httpd.json")

let cnf = Object.assign({}, conf);
cnf.name = "filename";
cnf.cmds.run.exe = "node";
cnf.os = require("os").type();

let processConf = config;
// // STEP 2: Start the process as a seperate thread
// if (!!processConf.path) {
//     // .path -> .JS File from the folder in the {.path} file

// let filePath = path.join(__dirname, processConf.cgiprocess);
// cnf.cmds.run.args.push(filePath);

// } else if (!!processConf.type) {
//     // .type -> Get JSON file from www/processes folder with the name {type}.json file

// let argJson = path.join(__dirname, "../../www/processes", processConf.type + ".json");
// cnf.cmds.run.args.push("./process.js", "-j", argJson);

// } else if (!!processConf.config) {
//     // .json -> parse json config from the specified .json file path 

cnf.cmds.run.args.push("./process.js", "-j", processConf.config);

// } else if (!!processConf.cmds && !!processConf.name) {
//     // Complete config in desktopcgi json in config-win_demo.json

// var uri_enc = (uri); //before you post the contents
// var uri_dec = decodeURIComponent(uri_enc); //before you display/use the contents.

// cnf.cmds.run.args.push("./process.js", "-c", Buffer.from(JSON.stringify(processConf)).toString('base64') );

// } else {
//     throw Error("server:xc.js: DesktopCGI config is not defined correctly in the key");
// }

//  STEP 3: Run the spawn using config
proc = require("./base")(cnf);

// let data = '{"new": true}';
// let buff = Buffer.from(data);
// let stringToBase64 = buff.toString('base64');
// console.log(stringToBase64)

// let base64ToString = Buffer.from(stringToBase64, "base64").toString();
// base64ToString = JSON.parse(base64ToString);
// console.log(base64ToString);
