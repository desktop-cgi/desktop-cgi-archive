const { app, BrowserWindow, remote } = require('electron');
// const {getCurrentWindow, globalShortcut} = remote;
const electron = require('electron');

electron.app.allowRendererProcessReuse = true;
global.appRoot = process.cwd();

const fs = require('fs');
let config = JSON.parse(fs.readFileSync('config.json'));

let win;
let proxyapp = {};
let sampleapp = {};
async function createWindow() {
    const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;

    require('./server/index')().then(function (apps) {
        console.log("apps", apps)
        sampleapp = apps.sampleapp;
        proxyapp = apps.proxyapp;

        win.loadURL('http://localhost:' + config.server.port);
        require('./server/native/menu');
    }.bind(proxyapp, sampleapp), (err) => {
        console.log('Error Starting Server', err);
    });

    win = new BrowserWindow({
        width: width,
        height: height,
        backgroundColor: '#FFF',
        show: false
    });

    // Debug Line to allow opening dev tools from electron
    //win.webContents.openDevTools();

    win.on('closed', function () {
        win = null;
        proxyapp = {};
        sampleapp = {};
    }.bind(proxyapp, sampleapp));

    win.once('ready-to-show', () => {
        win.show();
    })
}

app.on('ready', createWindow.bind(proxyapp, sampleapp));
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
        proxyapp = {};
        sampleapp = {};
    }
}.bind(proxyapp, sampleapp))

app.on('activate', function () {
    if (win === null) {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    }
}.bind(proxyapp, sampleapp));
