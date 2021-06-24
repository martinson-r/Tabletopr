const { environment, port } = require('../config');
const isProduction = process.env.NODE_ENV === "production";

let io = require('socket.io')()
console.log('production?', isProduction)

if (!isProduction) {
  io = require('socket.io')({cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }});
}

let connectedUsers = {};

console.log('connectedUsers', connectedUsers);

io.on('connection', function (socket) {
  console.log("Socket connected >>>>> :"+socket.id);

  socket.on('private-chat', function(data){

    let jsonMessageData = JSON.parse(data);
    connectedUsers[jsonMessageData.data.User.id] = socket.id;
    console.log('connectedUsers2', connectedUsers);

  });

  socket.on('send-chat-message', function (data) {
    let jsonMessageData = JSON.parse(data);
    const jsonRecipient = jsonMessageData.data.Recipient.id;
    const jsonUser = jsonMessageData.data.User.id;
    let recipientId = connectedUsers[jsonRecipient];
    let senderId = connectedUsers[jsonUser];
    console.log('sent message')
    io.to(senderId).emit('broadcast-chat-message', data);
    if (recipientId !== undefined) {
      io.to(recipientId).emit('broadcast-chat-message', data);
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    socket.removeAllListeners();
  });
});


module.exports = io;
