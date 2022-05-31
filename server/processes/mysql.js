/**
 * MySQL Database script
 * 
 * Start MySQL Database using .bat / .sh[todo] file
 * [TODO] Check alternatives of Code
 * 
 */


'use strict';

let conf = {
    name: "mysqlprocess",
    exe: "mysqld",
    type: "executable",
    os: "win32",
    cmds: {
        start: { exe: "mysqld", usage: "", args: ["-k start"] },
        stop: { exe: "mysqld", usage: "", args: ["-k stop"] },
        reload: { exe: "mysqld", usage: "", args: ["-k restart"] },
        startbatwin32: { exe: "..\\..\\binaries\\binscripts\\db-mysql\\win_start.bat", usage: "", args: [] },
        stopbatwin32: { exe: "..\\..\\binaries\\binscripts\\db-mysql\\win_taskkill.bat", usage: "", args: [] },
        startbatWindows_NT: { exe: "..\\..\\binaries\\binscripts\\db-mysql\\win_start.bat", usage: "", args: [] },
        stopbatWindows_NT: { exe: "..\\..\\binaries\\binscripts\\db-mysql\\win_taskkill.bat", usage: "", args: [] },
        startbatlinux: { exe: "..\\..\\binaries\\binscripts\\db-mysql\\linux_start.bat", usage: "", args: [] },
        stopbatlinux: { exe: "..\\..\\binaries\\binscripts\\db-mysql\\linux_taskkill.bat", usage: "", args: [] },
        startbatmac: { exe: "..\\..\\binaries\\binscripts\\db-mysql\\mac_start.bat", usage: "", args: [] },
        stopbatmac: { exe: "..\\..\\binaries\\binscripts\\db-mysql\\mac_taskkill.bat", usage: "", args: [] }
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

let mysqlprocess = require("./base")(conf);

// module.exports = mysqlprocess;
