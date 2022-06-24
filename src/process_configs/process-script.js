
let conf = {
    "name": "lsops",
    "exe": "ls",
    "type": "executable",
    "os": "",
    "cmds": {
        "start": { "exe": "", "usage": "ls", "args": [""] }
    },
    "options": {
        "stdio": "inherit",
        "shell": true
    },
    "other": {
        "paths": {
            "conf": "",
            "exe": ""
        },
        "env": "",
        "setprocess": true,
        "executetype": "exec",
        "command": "start"
    }
}

/**
 * Use in Script Config.
 */
module.exports = require("../../../server/src/processes/base");
