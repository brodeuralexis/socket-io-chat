'use strict';

const slots = require('../../slots').MESSAGES.TYPING;
const signals = require('../../signals').MESSAGES.TYPING;

const UnauthorizedError = require('../../errors/unauthorized');

const users = require('../users');

module.exports = function typing(io, socket) {

    socket.on(slots.START, function() {
        if (!users.isAuthenticated(socket)) {
            return callback(new UnauthorizedError());
        }

        socket.broadcast.emit(signals.STARTED, {
            user: socket.user
        });

        callback(null);
    });

    socket.on(slots.STOP, function() {
        if (!users.isAuthenticated(socket)) {
            return callback(new UnauthorizedError());
        }

        socket.broadcast.emit(signals.STOPPED, {
            user: socket.user
        });
    });

};
