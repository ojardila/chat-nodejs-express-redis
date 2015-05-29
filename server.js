var express = require('express');
var app = express();
var config = require('./config');
var middlewares = require('./middlewares');
var RedisStore = require('connect-redis')(express);
var session = express.session({ key: config.session_key, store: new RedisStore(), secret: config.session_secret_key }); 
var Chat = require('./classes/chat');
var User = require('./classes/user');


global.connected_users = []
global.chat =  new Chat()

app.engine('.html', require('ejs').__express)
app.set('views', __dirname + config.views_path)
app.set('view engine', 'html')
app.use(express.static(__dirname + config.views_path ));
app.use(express.urlencoded())
app.use(express.methodOverride())
app.use(express.query())
app.use(express.cookieParser(config.cookie_parser));
app.use(session);

//Custom Middlewares
app.use(middlewares.sessionManager);

//Custom Routes
require("./routes")(app);

if (!module.parent) {
  server=app.listen(3000);
  var io = require('socket.io').listen(server);
  io.use(function(socket, next){
      session(socket.request, {}, next);
  })
  global.chat.setSocketio(io);

  io.on('connection', function(socket){
      username = socket.request.session.username;
      user = null

      if(!global.chat.isUserAuthenticated(username)){
          chat_user = new User(username)
          chat_user.attachSocket(socket.id);
          global.chat.register(chat_user);
      }
      else {
        actual_user = global.chat.getUserbyUsername(username)
        actual_user.attachSocket(socket.id);
      }
 
      socket.on('chat_message', function(msg){
          from = global.chat.getUserbyUsername(msg.from)
          to = global.chat.getUserbyUsername(msg.to)
          global.chat.send(msg.content, from, to)
      });



 
      io.sockets.emit('online_users',global.chat.getConnectedUserNames())

  });
  console.log('Express app started on port 3000');
}
