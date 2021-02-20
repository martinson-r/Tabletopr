const io = require('socket.io')({cors: {
  origin: "http://localhost:3000",
  methods: ["GET", "POST"]
}});

io.on('connection', function (socket) {
    console.log("Socket connected :"+socket.id);
  socket.emit('news', { hello: 'world' });

  socket.on('send-chat-message', function(data) {
    io.emit('broadcast-chat-message', data);
  })
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});



module.exports = io;
