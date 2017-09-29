$(function () {
	var imgUrl="http://oss.softlinkonline.cn/pcimg/";
	var wrapper = document.getElementsByClassName('wrapper')[0];
	let scroll = new BScroll(wrapper, {
		scrollY: true,
		click: true
	})

	scroll.refresh();

	var over = document.getElementsByClassName('over')[0];
	let scroll2 = new BScroll(over, {
		scrollX: true,
		click: true,
	})
	scroll2.refresh();

	var lubo = document.getElementsByClassName('lubo')[0];
	var luboChild = lubo.children;
	lubo.style.width = luboChild.length * 73 + '%';

	document.addEventListener('touchstart', function (e) {
		scroll.refresh();
	})
	$(".qian").mobileClick(function () {
		$(".bg").show()
		$(".coupon").show()
	})
	$(".cuo").mobileClick(function () {
		$(".bg").hide()
		$(".coupon").hide()
		$(".cou_one").show()
		$(".doubt").show()
		$(".cou_two").hide()
		$(".cou_thr").hide()
		$(".coupon").css({ "height": "10.673913043478262rem" });
	})
	$(".doubt").mobileClick(function () {
		$(".cou_one").hide()
		$(".cou_thr").hide()
		$(".doubt").hide()
		$(".cou_two").show()
		$(".coupon").css({ "height": "10.673913043478262rem" })
	})
	$(".rightoff").mobileClick(function () {
		$(".cou_one").hide()
		$(".cou_two").hide()
		$(".cou_thr").show()
		$(".coupon").css({ "height": "4.673913rem" })
	})
	$(".Boutique").mobileClick(function () {
		window.location.href = "boutique.html"
	})
	$(".dataset").mobileClick(function () {
		window.location.href = "dataset.html"
	})
	$(".morev").mobileClick(function () {
		window.location.href = "Micro.html"
	})
	$.ajax({
		type:"post",
		url:"http://ceshi.softlinkonline.cn/app.php/recommended_courses",
		async:true,
		dataType:"json",
		success:function(data){
			console.log(data)
			var hop=data.data.course_data;
			for (var i=0;i<hop.length;i++) {
				var str1 = hop[i].price
				var str2 = hop[i].kg_price
				str1 = str1.replace(/^(\d+)\.(\d+)/,function($0,$1,$2){
					if($2 === '00'){
						return ' - '+'<a class="small">¥</a>'+$1
					}
				})
//				console.log(str1)
				str2 = str2.replace(/^(\d+)\.(\d+)/,function($0,$1,$2){
					if($2 === '00'){
						return $1
					}
				})
				var str='<div class="pre_con" id="'+hop[i].id+'"><div class="pre_igm"><img src="'+imgUrl+hop[i].logo+'" /></div><p>'+hop[i].name+'</p><div><strong>讲师名</strong><span><a class="small">¥</a>'+str2+str1+'</span></div></div>';
				$(".prese").append(str)
			}
			$('.jin .look').mobileClick(function(){
				window.location.href="boutique.html"
			})
			$('.pre_con').mobileClick(function(){
				window.location.href = "details.html?id/"+$(this).attr("id")
			})
		}
	});	
})
