const fs = require('fs');

process.exit(fs.existsSync(process.argv[2]) ? 0 : 1);
