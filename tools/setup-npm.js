const DELIMETER = require('path').delimiter
const FOLDER_TO_ADD = `${__dirname}/../node_modules/.bin${DELIMETER}`

if (process.env.PATH.indexOf(FOLDER_TO_ADD) === -1) {
  process.env.PATH =  FOLDER_TO_ADD + process.env.PATH
}
