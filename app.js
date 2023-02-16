const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

io.on('connection', (socket) => {
  // Gets a user connected to the server message
  socket.on('User_connected', (msg) => {
    //emits message to the client
    socket.broadcast.emit('message', 'User connected');
  });

  // Gets a message from the front-end/form
  socket.on('Chat_message', (message) => {
    // Sends a message from the server to the front end

    io.emit('Chat_message', message);
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('message', 'User disconnected');
  });
});

server.listen(4444, () => {
  console.log('Server listening on *:4444');
});
