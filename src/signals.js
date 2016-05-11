'use strict';

const keyMirror = require('./utilities/key-mirror');

module.exports = keyMirror({
    MESSAGES: {
        CREATED: null,
        TYPING: {
            STARTED: null,
            STOPPED: null
        }
    },
    USERS: {
        CONNECTED: null,
        DISCONNECTED: null
    }
});
