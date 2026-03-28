const spawn = require('child_process').spawn;
const path = require('path');

const scriptPath = path.join(__dirname, 'node_modules', 'react-scripts', 'bin', 'react-scripts.js');

const child = spawn('node', [scriptPath, 'start'], {
  stdio: 'inherit',
  shell: false
});

child.on('error', (error) => {
  console.error(`Error: ${error.message}`);
  process.exit(1);
});

child.on('exit', (code) => {
  process.exit(code);
});
