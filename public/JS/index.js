           var socket = io();
            
            socket.on('connect', ()=> {
                console.log("Connected to server");
                
                socket.emit('createMessage', {
                from: 'xyz@example.com',
                text: 'hi!! will meet at 7'
            })
            })
            
            socket.on('newMessage', function(message){
                console.log("new message", message)
            })
            
            
            
            socket.on('disconnect', ()=> {
                console.log("Disconnected from server")
            })