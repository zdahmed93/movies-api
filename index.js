const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/logging'); // the order here is important : we should import it first to enable logging on routes and db
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation');

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));