const winston = require('winston');
// require('winston-mongodb');
require('express-async-errors');

module.exports = function () {
    winston.add(winston.transports.File, { filename: 'logfile.log' }); // Winston can log errors in multiple transports. A transport is where a log is stored
    // winston.add(winston.transports.MongoDB, {
    //     db: 'mongodb://localhost/vidly' // we can another attribute to this object which is "level" that specifies what levels we want to store in the log collection (error / info / warn / ...) 
    // });

    // // HANDLE uncaughtException(for sync) & unhandledRejection(for async)
    // // for synchronous code
    // process.on('uncaughtException', (ex) => {
    //     console.log('WE GOT an uncaught exception');
    //     winston.error(ex.message, ex);
    // })
    // // for asynchronous code
    // process.on('unhandledRejection', (ex) => {
    //     console.log('WE GOT an unhandled rejection');
    //     winston.error(ex.message, ex);
    // })

    // Or Handle them with winston
    winston.handleExceptions(
        new winston.transports.Console({colorize: true, prettyPrint: true}),
        new winston.transports.File({ filename: 'uncaughtExceptions.log' })
    )
    process.on('unhandledRejection', (ex) => {
        throw ex;
    })
}