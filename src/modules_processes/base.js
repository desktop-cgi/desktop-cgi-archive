/**
 * CGIJS Process Script for executing processing
 * 
 * Start Process for provided config
 * [TODO] Check alternatives of Code
 * 
 */


function base(config, starthandler, closehandler, exithandler) {
    if (!config) {
        return false;
    }
    const cgijs = require("cgijs");
    const obj = cgijs.process();
    const utils = cgijs.utils();

    const events = require('events');
    const process = require("process");
    const { sign } = require("crypto");
    const eventEmitter = new events.EventEmitter();

    let evt = [`close`, `end`, `exit`, `SIGHUP`, `SIGQUIT`, `SIGKILL`, `SIGINT`, `SIGTERM`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`];
    let evtLen = evt.length;

    let conf = !!config ? config : cgijs.processConfigObject;
    let sysos = utils.os.get();
    let startcommand = (!!conf.other) ? (!!conf.other.command) ? conf.other.command : "startbat" + sysos : "startbat" + sysos;
    let stopcommand = "stopbat" + sysos;

    // console.log("conf", conf);
    let setter = (!!conf.other.setprocess) ? obj.process.set(conf) : true;

    if (!!setter) {
        starthandler = (!starthandler) ? function (error, stdout, stderr) { console.log(stdout); } : starthandler;
        closehandler = (!closehandler) ? function (options, proc) { setTimeout(function() { /* process.exit(0); */ }); } : closehandler;
        exithandler = (!exithandler) ? function (exitcode, anydata) { /* process.exit(0); */ } : exithandler;

        let proc = obj.process.executeAction(conf.name, startcommand, starthandler, closehandler);

        for (let i = 0; i < evtLen; i++) {
            process.on(evt[i], exithandler);
        }

        return {
            proc: proc,
            eventEmitter: eventEmitter,
            process: process
        }
    }
    return {}
}

module.exports = base;
