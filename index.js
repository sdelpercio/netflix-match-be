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
const { addMovies, removeMovies, getMovieMatches, removeMoviesRoom } = require('./movies')

// Sockets
io.on('connection', (socket) => {

    // Creating User, Joining room
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });
        if (error) return callback(error);

        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room: ${user.room}` })
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` })

        socket.join(user.room);

        callback();
    })

    // Genre Socket Functions
    socket.on('updateGenres', (genre) => {
        const user = getUser(socket.id)

        updateGenres(genre, user.room)
    })
    socket.on('getGenres', () => {
        const user = getUser(socket.id)
        
        const genres = getGenres(user.room)

        socket.emit('receiveGenres', genres)
        socket.broadcast.to(user.room).emit('receiveGenres', genres)
    })

    // Movie Socket Functions
    socket.on('addMovies', (movie) => {
        const user = getUser(socket.id)

        addMovies(movie, user.room)
    })
    socket.on('removeMovies', (movie) => {
        const user = getUser(socket.id)

        removeMovies(movie, user.room)
    })
    socket.on('getMovies', () => {
        const user = getUser(socket.id)

        const matches = getMovieMatches(user.room)

        socket.emit('receiveMovies', matches)
        socket.broadcast.to(user.room).emit('receiveMovies', matches)
    })

    // User Leaving
    socket.on('endConnection', (room) => {
        // removeGenresRoom(room)
        // removeMoviesRoom(room)

        console.log('A connection has left')
    })
})

// Server
app.use(router)
const PORT = 5000 || process.env.PORT

server.listen(PORT, () => console.log(`Server listening on Port:${PORT}`))