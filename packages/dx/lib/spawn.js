const child = require('child_process');

function spawn(cli, args, options = {}) {
  return child.spawn(cli, args, {
    cwd: options.cwd || process.cwd(),
    stdio: 'inherit',
    shell: options.shell,
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
