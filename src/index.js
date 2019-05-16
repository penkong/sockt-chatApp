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

io.on('connection',()=>{
  console.log('new websockt connection');
}); //after this initiation we need run client side.



server.listen(port,()=>{
  console.log(`running on port ${port}`);
})