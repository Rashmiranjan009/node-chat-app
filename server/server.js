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
    
    socket.emit('newMessage', {
        from: 'abc@example.com',
        text: 'hi!! meet me at 7',
        createdAt: new Date()
    })
    
    socket.on('createMessage', function(message){
                console.log("create message", message)
    })
    
    
    socket.on("disconnect", ()=>{
        console.log("lost connection to client")
    })
    
})



app.use(express.static(appPath));

server.listen(port, ()=> {
    console.log(`app started on port ${port}`);
})