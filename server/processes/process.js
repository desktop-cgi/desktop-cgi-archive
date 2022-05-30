
function processes(confPath) {
    // Get process json files using path from config.processes
    let conf = require(path.join(__dirname, confPath));
    let processstart = require("./base")(conf);
    return processstart;
}

module.exports = processes;

