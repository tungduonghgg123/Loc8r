var mongoose = require( 'mongoose');
var dbURI = 'mongodb://localhost/Loc8r';
var gracefulShutdown;
var dbURIlog = 'mongodb://localhost/Loc8rLog';
var logDB = mongoose.createConnection(dbURIlog);
if (process.env.NODE_ENV === 'production') {
        // dbURI = 'mongodb://admin:admin@ds119088.mlab.com:19088/tungduongloc8r';
    dbURI = process.env.MONGOLAB_URI;

}
mongoose.connect(dbURI);
mongoose.connection.on('connected', function(){
    console.log(' Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err){
    console.log(' Mongoose connection error ' + err);
});
mongoose.connection.on('disconnected', function(){
    console.log(' Mongoose disconnected');
});

gracefulShutdown = function (msg, callback) {
    mongoose.connection.close(function () {
        console.log( 'Mongoose disconnected through ' + msg);
        callback();
    });
};
process.once( 'SIGUSR2', function () {
    gracefulShutdown(' nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    })
});
process.once( 'SIGINT', function () {
    gracefulShutdown(' app termination', function () {
        process.exit(0);
    })
});
process.on('SIGTERM', function() {
    gracefulShutdown('Heroku app shutdown', function() {
        process.exit(0);
    })
})
// logDB.on('connected', function() {
//     console.log('Mongoose connected to' + dbURIlog);
// });
// logDB.close(function() {
//     console.log('Mongoose log disconnected');
// });
require('./locations')