require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const error = require('./middleware/error');
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const app = express();
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const rentals = require('./routes/rentals');
const movies = require('./routes/movies');
const users = require('./routes/users');
const auth = require('./routes/auth');
const mongoose = require('mongoose');



winston.add(winston.transports.File, {filename: 'logfile.log'});
winston.add(winston.transports.MongoDB, { 
    db: 'mongodb://localhost/vidly' // we can another attribute to this object which is "level" that specifies what levels we want to store in the log collection (error / info / warn / ...) 
});

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
    new winston.transports.File({ filename: 'uncaughtExceptions.log' })
)
process.on('unhandledRejection', (ex) => {
    throw ex;   
})

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.')
    process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly')
.then(console.log('Connected to mongoDB ...'))
.catch((err) => console.error('Failed to connect to mongoDB ...', err))

app.use(express.json());

// Working with routes
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

// middleware that handles exceptions (errors)
app.use(error);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));