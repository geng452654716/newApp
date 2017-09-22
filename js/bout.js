$(function(){
	$(".head li").click(function(){
		$(".head li>a").removeClass("blue")
		$(this).find("a").addClass("blue")
		var inx=$(this).index();
		console.log(inx)
		$(".con li").hide()
		$(".con li").eq(inx).show()
	})
	$(document).on("click",".recon_box",function(){
		window.location.href="details.html"
	})
})
