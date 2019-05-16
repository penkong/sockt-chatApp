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


let count = 0;
//socket is obj that have info of connection
// server emit -- client receive - countUpdated
// client emit -- server receive - increment
io.on('connection',(socket)=>{
  console.log('new websockt connection');
  //it run for each connection/user -- to send event
  //name of event > send init to client and in future send changes
  //emiting to client  ---------cb place
  socket.emit('countUpdated' , count);
  //for listening from client
  socket.on('increment', ()=>{
    count++;
    // socket.emit('countUpdated', count) //now let client know that we inc for him
    // we want to emit to every connection available for let other user see changes
    io.emit('countUpdated', count); //let every body know.
  })
}); //after this initiation we need run client side.




server.listen(port,()=>{
  console.log(`running on port ${port}`);
})