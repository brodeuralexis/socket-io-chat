'use strict';

const keyMirror = require('./utilities/key-mirror');

module.exports = keyMirror({
    MESSAGES: {
        CREATE: null,
        TYPING: {
            START: null,
            STOP: null
        }
    },
    USERS: {
        CONNECT: null,
        DISCONNECT: 'disconnect',
        GET: {
            COUNT: null,
            USERS: null
        }
    }
});
