const http = require('http');
const express = require('express');
const cors = require('cors');


const app = express();
const server = http.createServer(app);
let io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
});


io.on('connection', (socket) => {
     
       socket.on("join",(data)=>{
         console.log(data)
          socket.join(data.room)
          data.user="Admin"
          socket.to(data.room).emit("user-joined",{message:`${data.name} has joined the chat`,user:data.user})
       })
       socket.on("send-message",(data)=>{
          socket.to(data.room).emit("recieve-message",data)
       })

      
  });
  

server.listen(process.env.PORT || 4000, () => console.log(`Server has started.`));