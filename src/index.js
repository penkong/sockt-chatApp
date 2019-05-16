const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const publicDirPath = path.join(__dirname,'../public');
app.use(express.static(publicDirPath));

// app.get('/',(req,res)=>{
//   res.send('./index.html');
// })




app.listen(port,()=>{
  console.log(`running on port ${port}`);
})