var socket = io();

var form = document.getElementById('form');
var input = document.getElementById('input');
var messages = document.getElementById('messages');

// Sends a message from the form to the server
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit('Chat_message', input.value);
    input.value = '';
  }
});

// Gets the message from the server and displays it to the from end
socket.on('Chat_message', (msg) => {
  console.log(msg);
  var item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
