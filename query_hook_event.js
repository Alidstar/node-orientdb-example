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

    db.on("beginQuery", function(res){

    });

    db.on("endQuery", function(res){
        // console.log("DEBUG:", res);
        console.log("QUERY:", res.input.query);
        console.log("STATUS:", res.result.status.code);
        console.log('RESULT:', res.result.results);
        console.log('--------------------------------')
    });

    async.waterfall([
        function createTask(done) {
            db.query('CREATE VERTEX Task').then(function(res) {
                done()
            });
        },
        function listTask(done) {
            db.query('SELECT FROM Task').then(function(res) {
                done()
            });
        },
    ], function() {
        server.close();
    });
}



module.exports = queryExample;