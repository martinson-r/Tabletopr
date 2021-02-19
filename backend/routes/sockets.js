const io = require('socket.io')();

io.on('connection', function (socket) {
    console.log("Socket connected :"+socket.id);
  socket.emit('news', { hello: 'world' });
  });

module.exports = io;
