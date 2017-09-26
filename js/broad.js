$(function(){
	$(document).on("click",".bao",function(){
		var name=$(this).html();
		if(name=="立即报名"){
			window.location.href="../index/sign.html"
		}
	})

	let id = '' + window.location.search.substr(1).split('=')[1];

	ajax('app.php/app_huifang_play',function(data){
		console.log(data);
	},{id},'post')
})
