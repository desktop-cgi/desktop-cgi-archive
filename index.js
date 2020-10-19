const { app, BrowserWindow, remote } = require('electron');
// const {getCurrentWindow, globalShortcut} = remote;
const electron = require('electron');

global.appRoot = process.cwd();

const fs = require('fs');
let config = JSON.parse(fs.readFileSync('config.json'));

let win;

async function createWindow() {
    const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;

    require('./server/index')().then((msg) => {
        win.loadURL('http://localhost:' + config.server.port);
        require('./native/menu');
    }, (err) => {
        console.log('Error Starting Server');
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
    });
    win.once('ready-to-show', () => {
        win.show();
    })
}

app.on('ready', createWindow);
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})
app.on('activate', function () {
    if (win === null) {
        createWindow();
    }
});
