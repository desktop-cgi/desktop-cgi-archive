const { app, BrowserWindow, remote } = require('electron');
// const {getCurrentWindow, globalShortcut} = remote;
const electron = require('electron');
var path = require("path");

electron.app.allowRendererProcessReuse = true;
global.appRoot = process.cwd();

const fs = require('fs');
let config = JSON.parse(fs.readFileSync(path.resolve('./server/config.json')));

let win;
let apps = {};

async function createWindow() {
    const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
    
    require('./server/index')().then(function (apps) {
        // console.log("apps", apps)
        apps = apps;

        win.loadURL('http://localhost:' + config.server.port);
        require('./server/native/menu');
    }.bind(apps), (err) => {
        console.log('Error Starting Server', err);
    });

    win = new BrowserWindow({
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

app.setPath('temp', process.cwd() + config.app.temp)
app.setPath('cache', process.cwd() + config.app.cache)
app.setPath('downloads', process.cwd() + config.app.downloads)
app.setPath('userData', process.cwd() + config.app.userData)
app.setPath('logs', process.cwd() + config.app.logs)
app.setPath('recent', process.cwd() + config.app.recent)
// Failed to set path error
// app.setPath('crashDump', config.app.crashDump)
app.setPath('appData', process.cwd() + config.app.appData)

// Alternatively, use following AppData path based on OS
// aix, darwin, freebsd, linux, openbsd, sunos, win32

// if (process.platform === 'win32') {
//     app.setPath('appData', '%APPDATA%')
// } else if (process.platform === 'darwin') {
//     app.setPath('appData', '$XDG_CONFIG_HOME')
// } else if (process.platform === 'linux') {
//     app.setPath('appData', '~/Library/Application Support')
// }

app.on('ready', createWindow.bind(apps));
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
        apps = {};
    }
}.bind(apps))

app.on('activate', function () {
    if (win === null) {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    }
}.bind(apps));
