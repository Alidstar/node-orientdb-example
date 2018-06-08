var async = require('async');
var OrientDB = require('orientjs');
var common = require('./common.js');

// connect to ordb
var server = OrientDB(common.server);
var dbname = 'ordb';

function queryExample(callback) {
    callback = callback || function(){};

    var db = server.use({
        name: dbname
    });

    async.waterfall([
        function createTask(done) {
            db.query('CREATE VERTEX Task').then(function(res) {
                console.log("a task created");
                done()
            });
        },
        function listTask(done) {
            db.query('SELECT FROM Task').then(function(res) {
                console.log('result =', res);
                done()
            });
        }
    ], function() {
        server.close();
    });
}

module.exports = queryExample;