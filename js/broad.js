$(function(){
	$(document).on("click",".bao",function(){
		var name=$(this).html();
		if(name=="立即报名"){
			window.location.href="../index/sign.html"
		}
	})
})
