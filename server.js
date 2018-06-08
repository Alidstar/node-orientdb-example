var OrientDB = require('orientjs');
var common = require('./common.js');

// connect to ordb
var server = OrientDB(common.server);
var dbname = 'ordb';

function serverExample(callback) {
    callback = callback || function(){};
    // drop database
    server.drop({
        name: dbname
    }).then(function(res) {
        console.log('Deleted Database', res ? 'success' : 'failed');

        // create database
        var db = server.create({
            name: dbname,
        }).then(function(res) {
            console.log('Created Database', res.name);

            // close connection
            server.close();

            callback();
        })
    });
}

module.exports = serverExample;