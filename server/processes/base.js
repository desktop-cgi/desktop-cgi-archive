
function base(config) {
    if (!config) {
        return false;
    }
    const obj = require("cgijs").process();
    const utils = require("cgijs").utils();
    const cgijs = require("cgijs");
    const events = require('events');
    const path = require("path");
    const os = require("os");
    const { json } = require("express");
    const { sign } = require("crypto");
    const eventEmitter = new events.EventEmitter();

    let evt = [`close`, `end`, `exit`, `SIGHUP`, `SIGQUIT`, `SIGKILL`, `SIGINT`, `SIGTERM`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`];
    let evtLen = evt.length;

    let sysos = utils.os.get()
    let startcommand = "startbat" + sysos;
    let stopcommand = "stopbat" + sysos;


    let conf = {
        name: "",
        type: "",
        os: "",
        exe: "",
        cmds: {
            start: { exe: "", usage: "", args: [""] },
            stop: { exe: "", usage: "", args: [""] },
            reload: { exe: "", usage: "", args: [""] },
            startbatwin32: { exe: "", usage: "", args: [] },
            stopbatwin32: { exe: "", usage: "", args: [] },
            startbatWindows_NT: { exe: "", usage: "", args: [] },
            stopbatWindows_NT: { exe: "", usage: "", args: [] },
            startbatlinux: { exe: "", usage: "", args: [] },
            stopbatlinux: { exe: "", usage: "", args: [] },
            startbatmac: { exe: "", usage: "", args: [] },
            stopbatmac: { exe: "", usage: "", args: [] }
        },
        options: {
            stdio: 'inherit',
            shell: true
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

    conf = config;

    let httpdstarthandler = function (prc) {
        obj.process.exec("tasklist", [], {
            stdio: 'inherit',
            shell: true
        }, (error, stdout, stderr) => {
            // console.log(conf.name + " starthandler error ", error, " stdout ", stdout, " stderr ", stderr);
            console.log(conf.name + " tasklist stdout.includes(" + conf.exe + ")", stdout.includes("" + conf.exe + ""))
            eventEmitter.emit("closeprocess", { error: error, stdout: stdout, stderr: stderr });
        });
    }

    eventEmitter.on('test' + conf.name, httpdstarthandler.bind(obj));

    let setter = obj.process.set(conf);

    let closehandler = function (evt, processConf) {
        obj.process.executeAction(conf.name, stopcommand, (error, stdout, stderr) => {
            // console.log(conf.name + " command closehandler error ", error, " stdout ", stdout, " stderr ", stderr);
        }, (signal, anydata) => {
            // console.log(conf.name + " closehandler command anydata, signal", anydata, signal);
            console.log(conf.name + " closehandler command signal", signal);
            process.exit();
        });
    }

    let proc = obj.process.executeAction(conf.name, startcommand,
        (error, stdout, stderr) => {
            // console.log(conf.name + " command executeAction error ", error, " stdout ", stdout, " stderr ",stderr);
        },
        (signal, anydata) => {
            // console.log(conf.name + " command executeAction signal, anydata ", signal, anydata);
        }
    );

    for (let i = 0; i < evtLen; i++) {
        // console.log(conf.name + " Event Logging: ", evt[i]);
        process.on(evt[i], closehandler);
    }

    return {
        proc: proc,
        eventEmitter: eventEmitter,
        process: process
    }
}

module.exports = base;
