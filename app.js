const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public/html')));
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

io.on('connection', (socket) => {
  // Gets a message from the front-end/form
  socket.on('Chat_message', (message) => {
    // Sends a message from the server to the front end
    // socket.broadcast.emit('Chat_message', message);
    io.emit('Chat_message', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(4444, () => {
  console.log('Server listening on *:4444');
});
