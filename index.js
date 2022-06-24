/** 
 * 
 * 
 */

const path = require("path");
const fs = require("fs");
const os = require("os");
let ostype = os.type();
let dirname = __dirname;
let menus = "default";


let config_folder = "/www/configs";
let options = {
    "logger": (loggerFramework) => { }
}

let configurations;
if (ostype == "win32" || ostype === "Windows_NT") {
    configurations = JSON.parse(fs.readFileSync(path.join(dirname, config_folder, '/config-win_demo.json')));
} else if (ostype == "linux") {
    configurations = JSON.parse(fs.readFileSync(path.join(dirname, config_folder, '/config-linux_demo.json')));
} else if (ostype == "mac") {
    configurations = JSON.parse(fs.readFileSync(path.join(dirname, config_folder, '/config-mac_demo.json')));
}

let framework = require((!!configurations.framework) ? configurations.framework : "electron");
let frameworkBridge = configurations.framework + "-bridge";
if (!!configurations.menus) {
    menus = path.join(dirname, configurations.menus);
}

require("@desktop-cgi/" + configurations.framework).electron(dirname, framework, frameworkBridge, menus, configurations, options);
