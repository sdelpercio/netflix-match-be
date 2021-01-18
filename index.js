const express = require('express');
const socketio = require('socket.io')
const http = require('http');

const router = require('./router');
const app = express();
const server = http.createServer(app);
const io = socketio(server)

io.on('connection', (socket) => {
    console.log('we have a new connection')

    socket.on('disconnect', () => {
        console.log('A connection has left')
    })
})

app.use(router)
const PORT = 5000 || process.env.PORT

server.listen(PORT, () => console.log(`Server listening on Port:${PORT}`))