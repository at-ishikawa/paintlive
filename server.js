var io = require('socket.io')(8080);

let clients = [];
io.on('connection', function (socket) {
  clients.push(socket);
  // console.log(clients);
  socket.on('message', function () {
    // console.log(message);
  });
  socket.on('disconnect', function () { });
});
