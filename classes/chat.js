var Chat = function() {
    var Users = {};
    var socketio = null
 
    return {
 
        register: function(User) {
            Users[User.name] = User;
            User.Chat = this;
        },
        setSocketio: function(socketreference){
            console.log(socketio)
            socketio = socketreference;
        },
        getUsers: function() {
            return Users
        },
        getUserbyUsername: function(username) {
            return Users[username]
        },
        deleteUser: function(username) {
            delete Users[username]; 
        },
        broadcastMessage: function(key,message){
            socketio.broadcast.emit(key,message)

        },

        alertistyping: function(from, to){
           user_to_alert=this.getUserbyUsername(to)
           if(user_to_alert.name=!undefined && to!=undefined){
               user_to_alert.notify(from, to,socketio)
           }
        },

        getConnectedUserNames: function(){
           return Object.keys(Users)
        },
        isUserAuthenticated: function(username){
            return (this.getConnectedUserNames().indexOf(username)!=-1)
        },
        send: function(message, from, to) {
            if (to) {                      
                to.receive(message, from, socketio);    
            }
        }
    };
};
module.exports = Chat;