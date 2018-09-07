$(document).ready(function(){
	$("#showHide").click(function(){
		if ($(".password1").attr("type")=="password"){
			$(".password1").attr("type","text");
		} else {
			$(".password1").attr("type","password");
		}							
	});
	$("#showHide").click(function(){
		if ($(".password").attr("type")=="password"){
			$(".password").attr("type","text")
		} else {
			$(".password").attr("type","password")
		}							
	});
	$(".dropdown").hover(            
        function() {
                $('.dropdown-menu', this).stop( true, true ).fadeIn("slow");
                $(this).toggleClass('open');
                $('b', this).toggleClass("caret caret-up");                
        },
        function() {
                $('.dropdown-menu', this).stop( true, true ).fadeOut("fast");
                $(this).toggleClass('open');
                $('b', this).toggleClass("caret caret-up");                
        });
	//	$("#smessage").hide();
		$("#smessage").fadeTo(2000, 1000).slideUp(1000, function(){
			$("#smessage").slideUp(1000);
		}); 
});
