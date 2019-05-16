//client 
//allow to send and receive
const socket = io();
//receiving from server
socket.on('countUpdated',(count)=>{
  console.log('en updated' , count);
})
//now client send data to server
document.querySelector('#increment').addEventListener('click',()=>{
  console.log('CXClikcd');
  socket.emit('increment'); // send to server now must make sure sr get it
});


//server
let count = 0;
// socket is obj that have info of connection
// server emit -- client receive - countUpdated
// client emit -- server receive - increment
io.on('connection',(socket)=>{
  console.log('new websockt connection');
  //it run for each connection/user -- to send event
  //name of event > send init to client and in future send changes
  //emitting to client  ---------cb place
  socket.emit('countUpdated' , count);
  //for listening from client
  socket.on('increment', ()=>{
    count++;
    // socket.emit('countUpdated', count) //now let client know that we inc for him
    // we want to emit to every connection available for let other user see changes
    io.emit('countUpdated', count); //let every body know.
  })
}); //after this initiation we need run client side.