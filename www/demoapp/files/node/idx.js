const fs = require('fs');  
const child_process = require('child_process');  
var workerProcess = child_process.spawn('node', ['exp.js']);  
console.log(workerProcess)