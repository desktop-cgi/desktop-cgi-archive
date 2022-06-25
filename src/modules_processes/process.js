/**
 * Process script
 * 
 * Start Process script using config file or file
 * [TODO] Check alternatives of Code
 * 
 */


'use strict';

let arg = process.argv
let tArg = arg[2], cArg = arg[3];

switch (tArg) {
    case "-c":
        require("./base")(JSON.parse(Buffer.from(cArg, "base64").toString()));
    case "-f":
        require("./base")(cnf);
    case "-j":
        require("./base")(require(cArg));
    default:
        throw Error("server:processes:process.js: Specified Argument is not an available option", tArg, cArg);
}
