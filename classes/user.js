var User = function(name) {
    this.name = name;
    this.sockets = []
    User.Chat = null;

};
 
User.prototype = {
    send: function(message, to) {
        this.Chat.send(message, this, to);
    },
    attachSocket: function(socketid){
        this.sockets.push(socketid)
    },
    getSockets: function(){
        return this.sockets
    },
    notify: function(to,socketio) {
        sockets_destinatino = this.getSockets()
        actual_user= this.name;
        sockets_destinatino.forEach(function(socket){
            socketio.to(socket).emit('user_is_typing',{from: actual_user, to: to})
        })
    },
    receive: function(message, from, socketio) {
        console.log(from.name + " to " + this.name + ": " + message);
        sockets_origin = from.getSockets()
        sockets_destinatino = this.getSockets()
        sockets_to_notify = sockets_origin.concat(sockets_destinatino)
        sockets_to_notify.forEach(function(socket){
            socketio.to(socket).emit('receive_chat',{origin: from.name, destination: to.name, msg:message})
        })

    }
};
module.exports = User;