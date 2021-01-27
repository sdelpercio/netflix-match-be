const express = require('express');
const socketio = require('socket.io')
const http = require('http');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js')
const router = require('./router');
const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  })

io.on('connection', (socket) => {
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });

        if (error) return callback(error);

        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room: ${user.room}` })
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` })

        socket.join(user.room);

        callback();
    })

    socket.on('endConnection', () => {
        console.log('A connection has left')
    })
})

app.use(router)
const PORT = 5000 || process.env.PORT

server.listen(PORT, () => console.log(`Server listening on Port:${PORT}`))