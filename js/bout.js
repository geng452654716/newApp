$(function(){
	function ajx(typ){
		$.ajax({
			type:"post",
			url:"http://ceshi.softlinkonline.cn/app.php/recommended_courses_list",
			async:true,
			dataType:"json",
			data:{
				type:typ
			},
			success:function(data){
				console.log(data)
				$(".Examination").empty();
				var exa=data.data.recommended_courses_list;
				for (i=0;i<exa.length;i++) {
					var str1 = exa[i].price
					var str2 = exa[i].kg_price
					str1 = str1.replace(/^(\d+)\.(\d+)/,function($0,$1,$2){
						if($2 === '00'){
							return $1
						}
					})
	//				console.log(str1)
					str2 = str2.replace(/^(\d+)\.(\d+)/,function($0,$1,$2){
						if($2 === '00'){
							return $1+" - "+'<a class="small">¥</a>'
						}
					})
					var str='<div class="recon_box" id="'+exa[i].id+'"><div class="box_fl"><img src="http://oss.softlinkonline.cn/pcimg/'+exa[i].logo+'"></div><div class="box_rt"><p>'+exa[i].name+'</p><span>'+exa[i].teachername+'</span><div class="box_fot"><dd><a class="small">¥</a>'+str2+str1+'</dd><dt>1000人浏览</dt></div></div></div>';
					$(".Examination").append(str)
				}
			}
		});
	}
	ajx(4)
	$(".head li").click(function(){
		$(".head li>a").removeClass("blue")
		$(this).find("a").addClass("blue")
		ajx($(this).find("a").attr("typ"))
	})
	$(document).on("click",".recon_box",function(){
		window.location.href="details.html?id/"+$(this).attr("id")
	})
})
