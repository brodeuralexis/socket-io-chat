// Setup basic express server
const express = require('express');
const app = express();
app.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", req.headers.origin);
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  	res.header('Access-Control-Allow-Credentials', true);
  	return next();
});
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io').listen(server,{ origins: '*:*' });
const port = process.env.PORT || 3000;

// Routing
app.use(express.static(path.resolve(__dirname, '..', 'public')));

const users = require('./events/users');
const messages = require('./events/messages');
messages.typing = require('./events/messages/typing');

io.on('connection', function (socket) {
    users(io, socket);
	messages(io, socket);
    messages.typing(io, socket)
});

server.listen(port, function () {
	console.log('Server listening at port %d', port);
});
