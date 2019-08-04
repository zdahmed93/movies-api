const winston = require('winston');
module.exports = function(err, req, res, next) {
    winston.error(err.message, err);
    // Log the exception (on the server)
    res.status(500).send('Something failed.')
}