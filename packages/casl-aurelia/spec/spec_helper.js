import 'aurelia-polyfills'
import { Options } from 'aurelia-loader-nodejs'
import { join } from 'path'

process.browser = true
Options.relativeToDir = join(__dirname, '..', 'src')

