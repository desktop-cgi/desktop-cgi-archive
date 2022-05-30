// /**
//  * 
//  */

const fs = require('fs');
const path = require("path");
const electron = require('electron');
const cgijs = require("cgijs");
let cUtils = cgijs.utils();

// let { app, BrowserWindow, remote, screen } = require('electron');
// let {getCurrentWindow, globalShortcut} = remote;

electron.app.allowRendererProcessReuse = true;

// USAGE:
// Ignores Certificate errors in Electron
// electron.app.commandLine.appendSwitch('ignore-certificate-errors')

// USAGE:
// Disable Hardware acceleration if you get the error:
// [14880:1207/145651.085:ERROR:gpu_init.cc(457)] Passthrough is not supported, GL is disabled, ANGLE is
// https://stackoverflow.com/questions/70267992/win10-electron-error-passthrough-is-not-supported-gl-is-disabled-angle-is
electron.app.disableHardwareAcceleration()

electron.app.commandLine.appendSwitch('allow-insecure-localhost', 'true');
global.appRoot = process.cwd();

console.log(path.join(__dirname, 'server/configs/config-win.json'));

let ostype = cUtils.os.get();
let config;
if (ostype == "win32" || ostype === "Windows_NT") {
    config = JSON.parse(fs.readFileSync(path.join(__dirname, './server/configs/config-win_demo.json')));
} else if (ostype == "linux") {
    config = JSON.parse(fs.readFileSync(path.join(__dirname, './server/configs/config-linux_demo.json')));
} else if (ostype == "mac") {
    config = JSON.parse(fs.readFileSync(path.join(__dirname, './server/configs/config-mac_demo.json')));
}

let win;
let apps = {};

async function createWindow() {
    const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;

    require('./server/index')().then(function (apps) {
        // console.log("apps", apps);
        apps = apps;

        win.loadURL('http://localhost:' + config.server.port);
        require('./server/native/menu');
    }.bind(apps), (err) => {
        console.log('Error Starting Server', err);
    }).catch(function (err) {
        console.log("err");
    });

    win = new electron.BrowserWindow({
        width: width,
        height: height,
        backgroundColor: '#FFF',
        show: false
    });

    // Debug Line to allow opening dev tools from electron
    // win.webContents.openDevTools();

    // Web Content Loading
    // https://www.electronjs.org/docs/api/web-contents

    win.on('closed', function () {
        win = null;
        apps = {};
    }.bind(apps));

    win.once('ready-to-show', () => {
        win.show();
    });
}

electron.app.setPath('temp', process.cwd() + config.app.temp);
electron.app.setPath('cache', process.cwd() + config.app.cache);
electron.app.setPath('downloads', process.cwd() + config.app.downloads);
electron.app.setPath('userData', process.cwd() + config.app.userData);
electron.app.setPath('logs', process.cwd() + config.app.logs);
electron.app.setPath('recent', process.cwd() + config.app.recent);
// Failed to set path error
// electron.app.setPath('crashDump', config.app.crashDump)
electron.app.setPath('appData', process.cwd() + config.app.appData);

// 
// Alternatively, use following AppData path based on OS
// aix, darwin, freebsd, linux, openbsd, sunos, win32
// 
// if (process.platform === 'win32') {
//     electron.app.setPath('appData', '%APPDATA%')
// } else if (process.platform === 'darwin') {
//     electron.app.setPath('appData', '$XDG_CONFIG_HOME')
// } else if (process.platform === 'linux') {
//     electron.app.setPath('appData', '~/Library/Application Support')
// }
// 

electron.app.on('ready', createWindow.bind(apps));

electron.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron.app.quit();
        apps = {};
    }
}.bind(apps));

electron.app.on('activate', function () {
    if (win === null) {
        if (electron.BrowserWindow.getAllWindows().length === 0) createWindow();
    }
}.bind(apps));


