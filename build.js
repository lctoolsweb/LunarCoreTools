const { exec } = require('child_process');
const gradient = require('gradient-string');


const startTime = new Date();

console.log(gradient.retro('✨✨Starting production build...'));

const buildProcess = exec('vite build --mode production', (error, stdout, stderr) => {
  if (error) {
    console.error(`Build failed with error: ${stderr}`);
    process.exit(1);
  }

 
  const endTime = new Date();
  const buildTime = (endTime - startTime) / 1000;

  console.log(stdout);
  console.log(gradient.retro(`🎉打包完成，用时 ${buildTime} 秒，击败了全国99%的用户`));
  process.exit(0);
});

buildProcess.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

buildProcess.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

buildProcess.on('close', (code) => {
  console.log(`Child process exited with code ${code}`);
});
