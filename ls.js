const { spawn } = require('child_process');
const process = require("process");

const child = spawn('ls', []);

console.log(child.pid);
console.log(process.pid);

child.stdout.on('data', data => {
  console.log(`stdout:\n${data}`);
});

child.stderr.on('data', data => {
  console.error(`stderr: ${data}`);
});
