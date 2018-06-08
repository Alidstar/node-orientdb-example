var async = require('async');

async.waterfall([
    require('./server.js'),
    require('./class.js'),
    require('./query.js'),
    require('./query_hook_event.js'),
], function() {
    process.exit(0);
});