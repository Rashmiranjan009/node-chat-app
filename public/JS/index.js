           var socket = io();
            
            socket.on('connect', function() {
                console.log("Connected to server");
            })
            
            socket.on('newMessage', function(message){
                console.log("new message", message);
                var li = jQuery('<li></li>')
                li.text(`${message.from}: ${message.text} `) 
                jQuery('#messages').append(li);
                                
            })

            /*socket.emit('createMessage', {
                from: 'kathy',
                text: 'hello!'
            }, function(data){
                console.log(data);
                
            })
*/



            
        
            socket.on('disconnect', function() {
                console.log("Disconnected from server")
            })

jQuery('#message-form').on('submit', function(event){
    event.preventDefault();
    
    socket.emit('createMessage', {
        from: 'user',
        text: jQuery('[name="message"]').val()
    }, function(){
    })
})