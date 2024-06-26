let express = require('express');
const app = require("./app");

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

const port = process.env.PORT || 3000;

console.log('here')

io.on('connection', (socket) => {
    console.log('connection success')
    socket.on('join', (data) => {
        socket.join(data.room);
        socket.broadcast.to(data.room).emit('user joined');
    });

    socket.on('message', (data) => {
        io.in(data.room).emit('new message', {user: data.user, message: data.message});
    });
});

// server.listen(port, () => {
//     console.log(`started on port: ${port}`);
// });