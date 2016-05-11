'use strict';

const util = require('util');

function UnauthorizedError(message) {
    Error.call(this);
    Error.captureStackTrace(this, UnauthorizedError);
    this.name = 'Unauthorized';
    this.message = message;
}

util.inherits(UnauthorizedError, Error);

module.exports = UnauthorizedError;
