// /** 
//  * 
//  * Desktop-CGI to Initiate Electron or Different Desktop-CGI Framework
//  * 
//  * 
//  */

const path = require("path");
const fs = require("fs");
const os = require("os");
const electron = require('electron');
const { app, BrowserWindow, remote, screen } = require('electron');
// let {getCurrentWindow, globalShortcut} = remote;
const ut = require("./src/utils");

let ostype = os.type();
let dirname = __dirname;
let menus = "default";

let config_folder = "/www/configs";
let options = {
    "logger": (loggerFramework) => { }
}

let config;
if (ostype == "win32" || ostype === "Windows_NT") {
    config = JSON.parse(fs.readFileSync(path.join(dirname, config_folder, '/config-win_demo.json')));
} else if (ostype == "linux") {
    config = JSON.parse(fs.readFileSync(path.join(dirname, config_folder, '/config-linux_demo.json')));
} else if (ostype == "mac") {
    config = JSON.parse(fs.readFileSync(path.join(dirname, config_folder, '/config-mac_demo.json')));
}

/** 
 * 
    // // Commenting the Isolation version
    // // let app = require("desktopcgi-" + frameworkDefinition).electron(dirname, frameworkObject, frameworkBridge, menus, config, options);
    // // const electron = frameworkObject;
    // // let { app, BrowserWindow, remote, screen } = frameworkObject;
 * 
*/

// // USAGE:
// // Allows Render Process ReUse in Electron
if (!!config.app.allowRendererProcessReuse) {
    // electron.app.allowRendererProcessReuse = true;
    // electron.app.allowRendererProcessReuse = config.app.allowRendererProcessReuse;
}

// // USAGE:
// // Ignores Certificate errors in Electron
if (!!config.app.ignoreCertificateErrors) {
    electron.app.commandLine.appendSwitch('ignore-certificate-errors');
}

// // USAGE:
// // Disable Hardware acceleration if you get the error:
// // [14880:1207/145651.085:ERROR:gpu_init.cc(457)] Passthrough is not supported, GL is disabled, ANGLE is
// // https://stackoverflow.com/questions/70267992/win10-electron-error-passthrough-is-not-supported-gl-is-disabled-angle-is
//
if (!!config.app.disableHardwareAcceleration) {
    electron.app.disableHardwareAcceleration()
}

// // USAGE:
// // Allor or disallow Insecure localhost
if (!!config.app.allowInsecureLocalhost) {
    // electron.app.commandLine.appendSwitch('allow-insecure-localhost', 'true');
    electron.app.commandLine.appendSwitch('allow-insecure-localhost', config.app.allowInsecureLocalhost);
}

// // Provide the app root for the executable
// global.appRoot = process.cwd();
// global.appRoot = dirname;


/**
 *
 * createWindow
 * 
 * Logic for creating the electron window
 *
 * @param {*} dirname
 * 
 * @param {*} config
 * 
 * @param {*} options
 * 
 */
async function createWindow(dirname, config, options) {

    console.log("Desktop-CGI-Server: index.js: ready Event invoked #001");

    const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;

    let appConfig = config.app;
    // let frameworkDefinition = appConfig.framework;
    // let frameworkObject = require((!!frameworkDefinition) ? frameworkDefinition : "electron");
    let bridge = appConfig.frameworkBridge;
    let frameworkBridge = "desktopcgi-" + bridge + "-bridge";
    menus = (!!appConfig.menus) ? path.join(dirname, appConfig.menus) : menus;

    if (!frameworkBridge) {
        throw Error("Desktop-CGI-Server: index.js: Framework or Framework Bridge Path not provided #002");
    }

    console.log("Desktop-CGI-Server: index.js: Desktop-CGI App started: #003");

    // 
    // The following has been commented for use with independent npm package
    // TODO: Separate the desktop-cgi-application's electron (desktopcgi-electron) and express (express-bridge) server
    // 
    // let result = await require(frameworkBridge)(dirname, config, options);
    let result = await require("./src/index")(dirname, config, options);

    const win = new electron.BrowserWindow({
        width: width,
        height: height,
        backgroundColor: '#FFF',
        show: false,
        webPreferences: {
            preload: path.join(dirname, 'preload.js')
        }
    });

    if (config.server.loader === "file") {
        // // Load a HTML File
        // win.loadFile('C:/Users/ganes/Documents/projects/github/workspace-cgi/packages/desktop-cgi/www/demoapp/html/index.html');
    } else if (config.server.loader === "server") {
        // // Load a local server
        win.loadURL('http://' + config.server.host + ':' + config.server.port);
    } else {
        // // Load a local server
        win.loadURL('http://' + config.server.host + ':' + config.server.port);
    }

    if (menus === "default") {
        require("./src/native/electron_menu");
    } else {
        require(menus);
    }

    win.on('closed', function (win) {
        console.log("Desktop-CGI-Server: index.js: closed Event invoked #004");
        win = null;
        electron.apps = {};
    }.bind(null, electron));

    win.once('ready-to-show', () => {
        console.log("Desktop-CGI-Server: index.js: ready-to-show Event invoked #005");
        win.show();
    });

    win.webContents.on("did-fail-load", function () {
        console.log("Desktop-CGI-Server: index.js: did-fail-load Event invoked #006");
        win.loadURL('http://localhost:' + config.server.port + "/err");
    }.bind(win));

    // Web Content Loading
    // https://www.electronjs.org/docs/api/web-contents

}

console.log("Desktop-CGI-Server: index.js: setting app paths #007");

// // electron.app.setPath('temp', process.cwd() + config.app.temp);
// // electron.app.setPath('cache', process.cwd() + config.app.cache);
// // electron.app.setPath('downloads', process.cwd() + config.app.downloads);
// // electron.app.setPath('userData', process.cwd() + config.app.userData);
// // electron.app.setPath('logs', process.cwd() + config.app.logs);
// // electron.app.setPath('recent', process.cwd() + config.app.recent);

electron.app.setPath('temp', path.join(dirname, config.app.temp));
electron.app.setPath('cache', path.join(dirname, config.app.cache));
electron.app.setPath('downloads', path.join(dirname, config.app.downloads));
electron.app.setPath('userData', path.join(dirname, config.app.userData));
electron.app.setPath('logs', path.join(dirname, config.app.logs));
electron.app.setPath('recent', path.join(dirname, config.app.recent));

// // Failed to set path error
// // electron.app.setPath('crashDump', config.app.crashDump)
// // electron.app.setPath('appData', process.cwd() + config.app.appData);

// // Failed to set path error
// // electron.app.setPath('crashDump', path.join(dirname, config.app.crashDump))
electron.app.setPath('appData', path.join(dirname, config.app.appData));

// // 
// // Alternatively, use following AppData path based on OS
// // aix, darwin, freebsd, linux, openbsd, sunos, win32
// // 
// // os.type
// //   "Darwin" for MacOS, "Linux" for Linux and "Windows_NT" for windows
// // os.arch
// //   "x32", "x64", "arm", "arm64", "s390", "s390x", "mipsel", "ia32", "mips", "ppc" and "ppc64".
// // os.platform
// //   "aix", "android", "darwin", "freebsd", "linux", "openbsd", "sunos", and "win32"
// // 
// // if (process.platform === 'win32' || process.platform === '') {
// //     electron.app.setPath('appData', '%APPDATA%')
// // } else if (process.platform === 'darwin') {
// //     electron.app.setPath('appData', '$XDG_CONFIG_HOME')
// // } else if (process.platform === 'linux') {
// //     electron.app.setPath('appData', '~/Library/Application Support')
// // }
// // 

electron.app.whenReady().then(function () {
    console.log("Desktop-CGI-Server: index.js: app.whenReady Event invoked #008");
    createWindow(dirname, config, options);

    electron.app.on('activate', () => {
        console.log("Desktop-CGI-Server: index.js: activate Event invoked #009");
        if (win === null) {
            if (electron.BrowserWindow.getAllWindows().length === 0) createWindow();
        }
    });
}.bind(null, config, options));

electron.app.on('window-all-closed', () => {
    console.log("Desktop-CGI-Server: index.js: window-all-closed Event invoked #010");
    if (process.platform !== 'darwin') {
        electron.app.quit();
        electron.apps = {};
    }
});
