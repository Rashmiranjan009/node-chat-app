const path= require('path');
const http = require('http');
const express= require('express');
const socketIO = require('socket.io');

var appPath = path.join(__dirname, '../public');
var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket)=>{
    console.log("new user connected");
    
    socket.emit('newMessage', {                       //to the user who joined
        from: 'admin',
        text: 'welcome to chat app',
        createdAt: new Date().getTime()
    })
    
    socket.broadcast.emit('newMessage', {                       //to all other users
        from: 'admin',
        text: 'new user joined',
        createdAt: new Date().getTime()
    })
    
    
    socket.on('createMessage', function(message){       //listening to create message event
        console.log("create message", message);
        io.emit('newMessage', {                       //when user creates a message brodcast it to all users
        from: message.from,
        text: message.text,
        createdAt: new Date().getTime()
    })
    })
    
    
    socket.on("disconnect", ()=>{
        console.log("lost connection to client")
    })
    
})



app.use(express.static(appPath));

server.listen(port, ()=> {
    console.log(`app started on port ${port}`);
})