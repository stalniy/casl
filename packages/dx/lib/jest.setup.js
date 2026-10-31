const { TextEncoder, TextDecoder } = require('util');

// Node 10 exposes these through util, but dependencies expect them as globals.
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}

if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder;
}
