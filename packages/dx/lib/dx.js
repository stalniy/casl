const fsPath = require('path');
const fs = require('fs');
const { spawnAndExit } = require('./spawn');

const configPath = filename => fsPath.join(__dirname, '..', 'config', filename);
const localBin = cli => {
  const localReplacement = fsPath.join(__dirname, '..', 'bin', cli);
  return fs.existsSync(localReplacement)
    ? localReplacement
    : fsPath.join(__dirname, '..', 'node_modules', '.bin', cli);
}

const COMMANDS = {
  install() {
    const projectRoot = fsPath.join(__dirname, '..', '..', '..');
    return {
      cwd: projectRoot,
      cli: 'npx',
      args: ['-q', 'husky@~6.0.0', 'install', fsPath.join(projectRoot, 'git-hooks')],
    };
  },
  eslint() {
    const args = [];
    args.push('--parser-options', '{"project": "./tsconfig.json"}');
    args.push('-c', configPath('eslint.config.mjs'));

    return {
      args
    };
  },
  'lint-staged': function () {
    return {
      args: ['--config', configPath('lintstaged.js')],
    };
  },
  jest(cliArgs) {
    const args = ['--runInBand'];

    if (!cliArgs.includes('--config')) {
      args.push('--config', configPath('jest.config.js'));
    }

    return {
      args
    };
  },
  rollup() {
    return {
      args: ['--config', configPath('rollup.config.mjs')]
    };
  },
  tsc(cliArgs) {
    const args = [];

    if (!cliArgs.includes('-p')) {
      args.push('-p', 'tsconfig.build.json');
    }

    return {
      args,
    };
  }
};

function printHelp() {
  console.log(`
  DX executable - a simple proxy around development tools like eslint, prettier, semantic-release, etc.
  The main purpose is to provide default configuration files for mentioned tools.
  Supports: ${Object.keys(COMMANDS).join(', ')}
`);
}

function run(name, args) {
  if (!name || !(name in COMMANDS)) {
    printHelp();
    return;
  }

  if (name === 'install' && process.env.DX_CLI === 'semantic-release') {
    // skip hooks installation when it's triggered by npm publish during semantic-release process
    return;
  }

  const cmd = COMMANDS[name](args);
  const callArgs = args.length ? args : cmd.defaultArgs;
  const env = {
    DX_CLI: name,
    ...cmd.env,
  };
  const cliName = cmd.cli || name;
  const bin = cliName === 'npx' ? cliName : localBin(cliName);

  spawnAndExit(
    bin,
    [
      ...(cmd.args || []),
      ...(callArgs || []),
    ],
    {
      env,
      cwd: cmd.cwd,
    }
  );
}

module.exports = function dx(argv) {
  try {
    const [name, ...args] = argv;
    run(name, args);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
