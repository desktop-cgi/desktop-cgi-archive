const { app, Menu } = require('electron');

const template = [
    {
        label: 'File',
        submenu: [
            { role: 'close' }
        ]
    }, {
        label: 'Edit',
        submenu: [
            { role: 'undo' },
            { role: 'redo' },
            { type: 'separator' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' },
            { role: 'pasteandmatchstyle' },
            { role: 'delete' },
            { role: 'selectall' }
        ]
    },
    {
        label: 'View',
        submenu: [
            { role: 'reload' },
            { role: 'forcereload' },
            { role: 'toggledevtools' },
            { type: 'separator' },
            { role: 'resetzoom' },
            { role: 'zoomin' },
            { role: 'zoomout' },
            { type: 'separator' },
            { role: 'togglefullscreen' }
        ]
    },
    {
        role: 'window',
        submenu: [
            { role: 'minimize' },
            { role: 'close' }
        ]
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'Learn More',
                click() { require('electron').shell.openExternal('http://www.crypth.com') }
            },
            {
                label: "PHP Version",
                // accelerator: "Command+1",
                click(menuItem, browserWindow, event) {
                    browserWindow.loadURL('http://127.0.0.1:3001/php')
                }
            },
            {
                label: "Ruby Version",
                // accelerator: "Command+1",
                click(menuItem, browserWindow, event) {
                    browserWindow.loadURL('http://127.0.0.1:3001/rb')
                }
            },
            {
                label: "Ruby Default Config Version",
                // accelerator: "Command+1",
                click(menuItem, browserWindow, event) {
                    browserWindow.loadURL('http://127.0.0.1:3001/rbud')
                }
            },
            {
                label: "Perl plc file",
                // accelerator: "Command+1",
                click(menuItem, browserWindow, event) {
                    browserWindow.loadURL('http://127.0.0.1:3001/plc')
                }
            },
            {
                label: "Perl pld file",
                // accelerator: "Command+1",
                click(menuItem, browserWindow, event) {
                    browserWindow.loadURL('http://127.0.0.1:3001/pld')
                }
            },
            {
                label: "Perl Latest",
                // accelerator: "Command+1",
                click(menuItem, browserWindow, event) {
                    browserWindow.loadURL('http://127.0.0.1:3001/pl')
                }
            },
            {
                label: "Python2",
                // accelerator: "Command+1",
                click(menuItem, browserWindow, event) {
                    browserWindow.loadURL('http://127.0.0.1:3001/py')
                }
            },
            {
                label: "Python3",
                // accelerator: "Command+1",
                click(menuItem, browserWindow, event) {
                    browserWindow.loadURL('http://127.0.0.1:3001/py3')
                }
            },
            {
                label: "Catch all Link",
                accelerator: "Command+1",
                click(menuItem, browserWindow, event) {
                    browserWindow.loadURL('http://127.0.0.1:3001/sometest')
                }
            }
        ]
    }
]

if (process.platform === 'darwin') {
    template.unshift({
        label: app.getName(),
        submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services', submenu: [] },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideothers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }
        ]
    })

    // Edit menu
    template[1].submenu.push(
        { type: 'separator' },
        {
            label: 'Speech',
            submenu: [
                { role: 'startspeaking' },
                { role: 'stopspeaking' }
            ]
        }
    )

    // Window menu
    template[3].submenu = [
        { role: 'close' },
        { role: 'minimize' },
        { role: 'zoom' },
        { type: 'separator' },
        { role: 'front' }
    ]
}

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

module.exports = {
    Menu
}
