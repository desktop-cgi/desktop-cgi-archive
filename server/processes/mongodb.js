/**
 * MongoDB Database script
 * 
 * Start MongoDB Database using .bat / .sh[todo] file
 * [TODO] Check alternatives of Code
 * 
 */


 'use strict';

let conf = {
    name: "mongodprocess",
    exe: "mongod",
    type: "executable",
    os: "win32",
    cmds: {
        start: { exe: "mongod", usage: "", args: ["-k start"] },
        stop: { exe: "mongod", usage: "", args: ["-k stop"] },
        reload: { exe: "mongod", usage: "", args: ["-k restart"] },
        startbatwin32: { exe: "..\\..\\binaries\\binscripts\\db-mongo\\win_start.bat", usage: "", args: [] },
        stopbatwin32: { exe: "..\\..\\binaries\\binscripts\\db-mongo\\win_taskkill.bat", usage: "", args: [] },
        startbatWindows_NT: { exe: "..\\..\\binaries\\binscripts\\db-mongo\\win_start.bat", usage: "", args: [] },
        stopbatWindows_NT: { exe: "..\\..\\binaries\\binscripts\\db-mongo\\win_taskkill.bat", usage: "", args: [] },
        startbatlinux: { exe: "..\\..\\binaries\\binscripts\\db-mongo\\linux_start.bat", usage: "", args: [] },
        stopbatlinux: { exe: "..\\..\\binaries\\binscripts\\db-mongo\\linux_taskkill.bat", usage: "", args: [] },
        startbatmac: { exe: "..\\..\\binaries\\binscripts\\db-mongo\\mac_start.bat", usage: "", args: [] },
        stopbatmac: { exe: "..\\..\\binaries\\binscripts\\db-mongo\\mac_taskkill.bat", usage: "", args: [] }
    },
    options: {
        stdio: 'inherit',
        shell: false
    },
    other: {
        paths: {
            "conf": "",
            "exe": ""
        },
        env: "",
        setprocess: true,
        executetype: "exec",
        command: ""
    }
}

let mongodprocess = require("./base")(conf);

// module.exports = mongodprocess;
