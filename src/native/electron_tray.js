
const { Tray } = require('electron');

// // Tray
// https://livebook.manning.com/book/cross-platform-desktop-applications/chapter-8/59
// // Notifier
// https://livebook.manning.com/book/cross-platform-desktop-applications/chapter-15/18

const notes = [
    { title: 'Subscription list', contents: 'Test invites' },
    { title: 'Quick Actions list', contents: 'Test Actions' },
    { title: 'Insider invites', contents: 'Test names' }
];

function displayNoteToTray(note, win) {
    // win.webContents.send('displayNote', note);
}

function addNoteToTrayMenu(note) {
    return {
        label: note.title,
        type: 'normal',
        click: (win) => { displayNoteToTray(note, win); }
    };
}

module.exports = {
    Tray, notes, displayNoteToTray, addNoteToTrayMenu
}