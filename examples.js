var async = require('async');

async.waterfall([
    require('./server.js'),
    require('./class.js'),
    // require('./query.js'),
], function() {
    process.exit(0);
});