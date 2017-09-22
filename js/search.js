$(function(){
	$(document).on("click",".tab li",function(){
		$(".tab li a").removeClass("blue")
		$(this).find("a").addClass("blue")
		var subscript=$(this).index();
		console.log(subscript)
		$(".option li").hide()
		$(".option li").eq(subscript).show()
	})
	$(document).bind("input propertychange",".search",function(){
		var val=$.trim($(".search").val())
	 	if(val!=""){
	 		$(".eliminate").show()
	 	}else{
	 		$(".eliminate").hide()
	 	}
	})
	$(".eliminate").click(function(){
		$(".search").val("")
	})
})
