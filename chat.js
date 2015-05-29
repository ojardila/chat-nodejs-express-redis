var User = function(name) {
    this.name = name;
};
 
User.prototype = {
    send: function(message, to) {
        this.Chat.send(message, this, to);
    },
    receive: function(message, from) {
        log.add(from.name + " to " + this.name + ": " + message);
    }
};
module.exports = User;