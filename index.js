const express = require('express');
const socketio = require('socket.io')
const http = require('http');
const router = require('./router');
const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  })

// module functions
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js')
const { updateGenres, getGenres, removeGenresRoom } = require('./genres.js')

// socket functions
io.on('connection', (socket) => {

    socket.on('join', ({ name, room }, callback) => {
        // create user
        const { error, user } = addUser({ id: socket.id, name, room });
        if (error) return callback(error);

        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room: ${user.room}` })
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` })

        socket.join(user.room);

        callback();
    })

    socket.on('updateGenres', (genre) => {
        const user = getUser(socket.id)

        updateGenres(genre, user.room)
    })

    socket.on('getGenres', (callback) => {
        const user = getUser(socket.id)
        const genres = getGenres(user.room)

        callback(genres)
    })

    socket.on('endConnection', (genre) => {
        removeGenresRoom(genre)
        console.log('A connection has left')
    })
})

// server
app.use(router)
const PORT = 5000 || process.env.PORT

server.listen(PORT, () => console.log(`Server listening on Port:${PORT}`))