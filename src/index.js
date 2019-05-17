const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
//normally express do this behind scene
const server = http.createServer(app); //refactoring for socket 
//instance of socketio -- we make server to can explicity pass here
const io = socketio(server); // its app of socketio like express

const port = process.env.PORT || 3000;
const publicDirPath = path.join(__dirname,'../public');
app.use(express.static(publicDirPath));



let msg = 'welecome dear user!'

io.on('connection', (socket)=>{
  socket.emit('message', msg); //from server
  //broadcasting send to all except user come in chat room
  socket.broadcast.emit('message', 'a new user has joined');

  socket.on('sendMessage', (message)=>{ //from client
    io.emit('message', message); //let every body know.
  })
  socket.on('sendLocation', (coords)=>{ //receive
    io.emit('message', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`);
  })
  //for let other know who left room
  socket.on('disconnect', ()=>{
    io.emit('message', 'a user has left!');
  })
  
})


server.listen(port,()=>{
  console.log(`running on port ${port}`);
})