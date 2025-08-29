const child = require('child_process');

function spawn(cli, args, options = {}) {
  // Handle Windows compatibility
  const isWindows = process.platform === 'win32';
  const command = isWindows && !cli.endsWith('.cmd') && !cli.endsWith('.exe') ? cli + '.cmd' : cli;
  
  return child.spawn(command, args, {
    cwd: options.cwd || process.cwd(),
    stdio: 'inherit',
    shell: isWindows, // Windows requires shell to execute commands properly
    env: {
      ...process.env,
      ...options.env,
      FORCE_COLOR: '1',
    },
  });
}

function spawnAndExit(cli, args, options) {
  const cliProcess = spawn(cli, args, options);
  cliProcess.once('exit', exitCode => process.exit(exitCode || 0));
  return cliProcess;
}

module.exports = {
  spawn,
  spawnAndExit,
};
