const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http,
// {
//   path: '/test',
//   serveClient: false,
//   pingInterval: 10000,
//   pingTimeout: 5000,
//   cookie: false
// }
);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  //connected user
  io.emit('chat message', 'a user connected');
  //disconnect user
  socket.on('disconnect', function(){
    io.emit('chat message', 'user disconnected');
  });
  // receive and broadcast message to connected user
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
