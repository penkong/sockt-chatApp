//allow to send and receive
const socket = io();


//elements interface mutation like disable form 
//$ means its element for dom
const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $sendLocationButton = document.querySelector('#send-location')
// //receiving from server
socket.on('message', msg=>{
  console.log(msg);
})
//send from client
$messageForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  //UI GUYS
  //we want disable form to wait acknowledge here.
  $messageFormButton.setAttribute('disabled','disabled');
  // const message = document.querySelector('input').value;
  const message = e.target.elements.message.value;
  socket.emit('sendMessage', message, (error)=>{ //arg come from cb in server
    //enable form again here
    $messageFormButton.removeAttribute('disabled');
    $messageFormInput.value = '';
    $messageFormInput.focus();

    if(error) return console.log(error);

    //acknowledge last arg
    console.log('the message delivered.');
  });
})

$sendLocationButton.addEventListener('click',()=>{

  if(!navigator.geolocation) return alert('Geolocation not supported by browser');
  //ui related
  $sendLocationButton.setAttribute('disabled','disabled');

  navigator.geolocation.getCurrentPosition((position)=>{
    socket.emit('sendLocation', {
      latitude : position.coords.latitude,
      longitude : position.coords.longitude
    } , (error)=>{ //acknowledgement
      if(error) return console.log(error);
      $sendLocationButton.removeAttribute('disabled');
      console.log('Location Shared!')
      //ui dom
    });
  })
})