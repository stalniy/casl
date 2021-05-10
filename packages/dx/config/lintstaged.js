const fsPath = require('path');

const dx = fsPath.join(__dirname, '..', 'bin', 'dx.js');

module.exports = {
  '**/*.ts': [
    `${dx} eslint --fix`
  ]
};
