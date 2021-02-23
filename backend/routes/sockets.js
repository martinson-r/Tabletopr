// const io = require('socket.io')({cors: {
//   origin: "http://localhost:3000",
//   methods: ["GET", "POST"]
// }});

const io = require('socket.io')();

let connectedUsers = {};

io.on('connection', function (socket) {
  console.log("Socket connected :"+socket.id);
  socket.on('private-chat', function(data){
    console.log('private chat data', data);
    let jsonMessageData = JSON.parse(data);
    console.log('jsonMessageData', jsonMessageData);
    connectedUsers[jsonMessageData.data.User.id] = socket.id;
    console.log('connectedUsers', connectedUsers);
    const jsonRecipient = jsonMessageData.data.Recipient.id;
    const jsonUser = jsonMessageData.data.User.id;
    console.log(jsonUser);
    socket.join(jsonMessageData.data.User.id);
    let recipientId = connectedUsers[jsonRecipient];
    let senderId = connectedUsers[jsonUser];
    console.log('recipientId', recipientId)
    console.log('senderId', senderId)

  });

  socket.on('send-chat-message', function (data) {
    console.log('connected users', connectedUsers)
    console.log('message sent', data)
    let jsonMessageData = JSON.parse(data);
    const jsonRecipient = jsonMessageData.data.Recipient.id;
    const jsonUser = jsonMessageData.data.User.id;
    let recipientId = connectedUsers[jsonRecipient];
    let senderId = connectedUsers[jsonUser];

    if (recipientId !== undefined) {
      io.to(recipientId).emit('broadcast-chat-message', data);
    }
    io.to(senderId).emit('broadcast-chat-message', data);
    console.log('broadcast data', data, ' sender ', senderId);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});



module.exports = io;
