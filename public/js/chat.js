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