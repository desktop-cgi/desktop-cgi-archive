
const { Tray } = require('electron');

// // Tray
// https://livebook.manning.com/book/cross-platform-desktop-applications/chapter-8/59
// // Notifier
// https://livebook.manning.com/book/cross-platform-desktop-applications/chapter-15/18

const notes = [
    { title: 'subscription list', contents: 'Test invites' },
    { title: 'Quick Actions list', contents: 'Test Actions' },
    { title: 'insider invites', contents: 'Test names' }
];

function displayNoteToTray(note, win) {
    win.webContents.send('displayNote', note);
}

function addNoteToTrayMenu(note) {
    return {
        label: note.title,
        type: 'normal',
        click: () => { displayNoteToTray(note); }
    };
}

module.exports = {
    Tray, notes, displayNoteToTray, addNoteToTrayMenu
}