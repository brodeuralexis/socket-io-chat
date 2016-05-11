'use strict';

const _ = require('lodash');
const uuid = require('uuid');

const slots = require('./../slots').USERS;
const signals = require('./../signals').USERS;
const UnauthorizedError = require('./../errors/unauthorized');

let _count = 0;
let _users = {};

module.exports = function users(io, socket) {
    socket.users = null;

    socket.on(slots.CONNECT, function connect(username, callback) {
        if (users.isAuthenticated(socket)) {
            return callback(new UnauthorizedError());
        }

        ++_count;
        socket.user = {
            id: uuid.v4(),
            username: username
        };

        _users[socket.user.id] = socket.user;

        socket.broadcast.emit(signals.CONNECTED, {
            user: socket.user,
            count: _count
        });

        callback(null, {
            users: _.values(_users),
            user: socket.user,
            count: _count
        });
    });

    socket.on(slots.DISCONNECT, function disconnect() {
        if (!users.isAuthenticated(socket)) {
            return;
        }

        --_count;
        delete _users[socket.user.id];
        const user = socket.user;
        socket.user = null;

        socket.broadcast.emit(signals.DISCONNECTED, {
            user: user,
            count: _count
        });
    });

    socket.on(slots.GET.COUNT, function(callback) {
        if (!users.isAuthenticated(socket)) {
            return callback(new UnauthorizedError());
        }

        callback(null, {
            count: _count
        });
    });

    socket.on(slots.GET.USERS, function(callback) {
        if (!users.isAuthenticated(socket)) {
            return callback(new UnauthorizedError());
        }

        callback(null, {
            users: _.values(_users)
        });
    });

};

module.exports.isAuthenticated = function isAuthenticated(socket) {
    return socket.user != null;
};
