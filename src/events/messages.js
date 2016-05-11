'use strict';

const slots = require('./../slots').MESSAGES;
const signals = require('./../signals').MESSAGES;

const users = require('./users');

const UnauthorizedError = require('../errors/unauthorized');

module.exports = function messages(io, socket) {

    socket.on(slots.CREATE, function create(message, callback) {
        if (!users.isAuthenticated(socket)) {
            return callback(new UnauthorizedError());
        }

        message = {
            content: message,
            timestamp: (new Date()).valueOf()
        };

        socket.broadcast.emit(signals.CREATED, {
            user: socket.user,
            message: message
        });

        callback(null, {
            user: socket.user,
            message: message
        });
    });

};
