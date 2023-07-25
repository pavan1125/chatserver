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

const users=[]

io.on('connection', (socket) => {
       console.log(`user connected ${socket.id}`)
       socket.on("join",(data)=>{
          socket.join(data.room)
          socket.to(data.room).emit("user-joined",{message:`${data.name} has joined the chat`,sender:data.sender})
       })
       socket.on("send-message",(data)=>{
          socket.to(data.room).emit("recieve-message",data)
       })
  });

server.listen(process.env.PORT || 4000, () => console.log(`Server has started.`));