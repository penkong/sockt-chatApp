//allow to send and receive
const socket = io();
// //receiving from server
socket.on('message', msg=>{
  console.log(msg);
})
//send from client
document.querySelector('#message-form').addEventListener('submit',(e)=>{
  e.preventDefault();
  // const message = document.querySelector('input').value;
  const message = e.target.elements.message.value;
  socket.emit('sendMessage', message, (error)=>{ //arg come from cb in server
    if(error) return console.log(error);

    //acknowledge last arg
    console.log('the message delivered.');
  });
})

document.querySelector('#send-location').addEventListener('click',()=>{
  if(!navigator.geolocation) return alert('Geolocation not supported by browser');
  navigator.geolocation.getCurrentPosition((position)=>{
    socket.emit('sendLocation', {
      latitude : position.coords.latitude,
      longitude : position.coords.longitude
    } , (error)=>{ //acknowledgement
      if(error) return console.log(error);
      console.log('Location Shared!')
    });
  })
})