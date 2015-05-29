$(document).ready(function(){
  var socket = io();
  var panel_users=$('.tab-online-users .panel-body ul')
  
  function addConnectedUser(user){
    panel_users.append("<li class='"+user+"'><a href='#'>"+user+"</a></li>")

  }

  $('form').submit(function(){
  	if( ($('#actual-chat').text()!=$('#username').text() ) && $('#actual-chat').text()!='nobody'){
        socket.emit('chat_message', { from: $('#username').text(), to: $('#actual-chat').text(), content: $('#message').val() });
        $('#message').val('');
        return false;
  	}
  	else{
  	    alert('Please select an user for starting a chat')
  	    return false;
  	}
  });


  socket.on('online_users', function(msg){
      panel_users.html("");
      $.each(msg, function( index, value ) {
  	      addConnectedUser(value);
  	      activeOnlineUsers();
  	      $('li.'+$('#username').text()).css('display','none')
  	      if(!$('#'+value).length){
  	          //$('.tab-chat .panel-body').append("<ul class='chat' id='"+value+"'></ul>"); 
  	      }
      });
  });
  socket.on('receive_chat', function(msg){
  	  var classbox1=(msg.origin+msg.destination);
  	  var classbox2=msg.destination+msg.origin;
  	  if($('#'+classbox1).length!==0 || $('#'+classbox2).length!==0){
	  	  if($('#'+classbox1).length!==0){
	          $('#'+classbox1).append("<li><strong>"+msg.origin+": </strong>"+msg.msg+"</li>");          
	  	  }
	  	  if($('#'+classbox2).length!==0){
	          $('#'+classbox2).append("<li><strong>"+msg.origin+": </strong>"+msg.msg+"</li>");          
	  	  }
  	  }
  	  else{
  	      $('.tab-chat .panel-body').append('<ul   class="chat" id="'+classbox1+'"></ul>');
          $('#'+classbox1).append("<li><strong>"+msg.origin+": </strong>"+msg.msg+"</li>");            	  	
  	  }
      $('.tab-chat .panel-body').animate({scrollTop: $('.tab-chat .panel-body').prop("scrollHeight")}, 500);
  });


});