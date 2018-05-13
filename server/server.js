const path= require('path');
const http = require('http');
const express= require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
var appPath = path.join(__dirname, '../public');
var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket)=>{
    console.log("new user connected");
    
    socket.emit('newMessage', generateMessage('admin', 'Welcome to the chat App'))
    
    socket.broadcast.emit('newMessage', generateMessage('admin', 'New User Joined'))
    
    
    socket.on('createMessage', (message,callback)=>{       //listening to create message event
        console.log("create message", message);
        io.emit('newMessage', generateMessage(message.from, message.text))
        callback("acknowledged by server");
    })
    
    
    socket.on("disconnect", ()=>{
        console.log("lost connection to client")
    })
    
})



app.use(express.static(appPath));

server.listen(port, ()=> {
    console.log(`app started on port ${port}`);
})