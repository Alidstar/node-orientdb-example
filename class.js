var async = require('async');
var _ = require('lodash');
var OrientDB = require('orientjs');
var common = require('./common.js');

var server = OrientDB(common.server);

// connect to database
var db = server.use({
    name: 'ordb'
});
var dataClass = 'Data';
var taskClass = 'Task';

function classExample(callback) {
    async.waterfall([
        function listClasses(done) {
            db.class.list().then(function(classes) {
                var existedClasses = _.map(classes, 'name');
                console.log('There are', existedClasses);
                done();
            })
        },
        function dropClasses(done) {
            async.parallel([
                function dropTaskClass(pdone) {
                    db.class.drop(taskClass).then(function() {
                        console.log(taskClass, 'dropped');
                        pdone();
                    });
                },
                function dropDataClass(pdone) {
                    db.class.drop(dataClass).then(function() {
                        console.log(dataClass, 'dropped');
                        pdone();
                    })
                }
            ], function() {
                done();
            })
        },
        function createClasses(done) {
            async.series([
                function createDataClass(pdone) {
                    db.class.create(dataClass, 'V').then(function(res) {
                        console.log(res.name, 'created');
                        pdone();
                    })
                },
                function createTaskClassExtendsDataClass(pdone) {
                    db.class.create(taskClass, dataClass).then(function(res) {
                        console.log(res.name, 'created');
                        pdone()
                    })
                }
            ], function() {
                done();
            })
        },
        function getTaskClass(done) {
            db.class.get(taskClass).then(function(Task) {
                console.log('Retrive Task class');
                done(null, Task);
            });
        },
        function modifyProperties(Task, done) {
            async.series([
                function addProperties(pdone) {
                    Task.property.create([{
                        name: 'name',
                        type: 'String'
                    }, {
                        name: 'dueDate',
                        type: 'Date'
                    }, {
                        name: 'isNotDone',
                        type: 'Boolean'
                    }, {
                        name: 'wrongProp',
                        type: 'String'
                    }]).then(function(prop) {
                        console.log('Created property', _.map(prop, 'name'), "for", taskClass);
                        pdone();
                    });
                },
                function listProperties(pdone) {
                    Task.property.list().then(function(res) {
                        console.log('Task has', _.map(res, 'name'));
                        pdone();
                    });
                },
                function deleteProperties(pdone) {
                    Task.property.drop('wrongProp').then(function() {
                        console.log('Drop property wrongProp');
                        pdone();
                    });
                },
                function renameProperties(pdone) {
                    Task.property.rename('isNotDone', 'isDone').then(function() {
                        console.log('Rename isNotDone to isDone');
                        pdone(null);
                    });
                },
                function listProperties(pdone) {
                    Task.property.list().then(function(res) {
                        console.log('Task now has', _.map(res, 'name'));
                        pdone();
                    });
                },
            ], function() {
                done();
            })
        }
    ], function() {
        server.close();
        callback();
    });
}

module.exports = classExample;