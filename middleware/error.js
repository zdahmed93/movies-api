const winston = require('winston');

// Express error middleware function to catch any unhandled exceptions in the "request processing pipeline"
module.exports = function(err, req, res, next) {
    winston.error(err.message, err);
    // Log the exception (on the server)
    res.status(500).send('Something failed.')
}