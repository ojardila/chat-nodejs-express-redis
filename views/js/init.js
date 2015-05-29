function activeOnlineUsers(){
    $('.tab-online-users ul li').click(function(){
    $('.tab-online-users ul li').removeClass('active')
    $('.chat').css('display','none')
    user = $(this).attr("class")
    var classbox1= ($('#username').text()+user).replace(/\s/g, "");
    var classbox2  = (user+$('#username').text()).replace(/\s/g, "");
 

    $(this).addClass('active');
    $('#actual-chat').text(user);
    console.log("#"+classbox1)
    console.log("#"+classbox2)
    $("#"+classbox1).css('display','block');
    $("#"+classbox2).css('display','block')
	})
}

$(document).ready(function(){

$('#openBtn').click(function(){
	$('#myModal').toggle("fast",function(){
	    $(this).modal({show:true});
	});
});	



});
