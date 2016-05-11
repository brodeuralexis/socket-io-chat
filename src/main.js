// Setup basic express server
const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

server.listen(port, function () {
	console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(path.resolve(__dirname, '..', 'public')));

const users = require('./events/users');
const messages = require('./events/messages');
messages.typing = require('./events/messages/typing');

io.on('connection', function (socket) {
    users(io, socket);
	messages(io, socket);
    message.typing(io, socket)
});