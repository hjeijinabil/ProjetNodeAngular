let express = require('express');
let app = express();

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

const port = process.env.CHATPORT || 7000;

io.on('connection', (socket) => {
    socket.on('join', (data) => {
        console.log(data)
        console.log(data.room)
        socket.join(data.room);
        socket.broadcast.to(data.room).emit('user joined');
    });

    socket.on('message', (message) => {
        console.log(message)
        io.in(message.room).emit('new message', {message});
    });
});

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});

module.exports = io