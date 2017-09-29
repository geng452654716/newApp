$(function(){
	const nav = document.getElementsByClassName('nav')[0];
	let li = nav.getElementsByTagName('li');
	li = [...li];
	li.forEach(function(e){
		e.addEventListener('touchstart',function(){
			$(".nav li>a").removeClass("blue")
			$(this).find("a").addClass("blue")
			var inx=$(this).index();
			$(".con li").hide()
			$(".con li").eq(inx).show()
		})
	})
	$('.bao_rt')[0].addEventListener('touchstart',function(){
		$('.mask').show();
		$('.bombBox').css({
			bottom:25/50 + 'rem'
		});
	})
	changeYouHui();
	var you = true;
	$('.youhui')[0].addEventListener('touchstart',function(){
		you = !you;
		changeYouHui();
	})
	$('.mask')[0].addEventListener('touchstart',function(){
		$('.mask').hide();
		$('.bombBox').css({
			bottom:'-19.6rem'
		});
	})
	var str = location.href; 
	var num = str.lastIndexOf("/");
	var str=str.substring(num+1,str.length);
	function changeYouHui(){
		if(you){
			$('.button').addClass('quan').removeClass('weixin');
			$('.youhui').addClass('yes').removeClass('no');
			$('.button').html('优惠券支付');
			$('.youhui strong').html('128元优惠券');
		}else{
			$('.button').addClass('weixin').removeClass('quan');
			$('.youhui').addClass('no').removeClass('yes');
			$('.button').html('微信支付');
			$('.youhui strong').html('不使用优惠券');
		}
	}
	$.ajax({
		type:"post",
		url:"http://ceshi.softlinkonline.cn/app.php/app_details_data",
		async:true,
		dataType:"json",
		data:{
			id:str
		},success:function(data){
			var deta=data.data;
			console.log(deta)
			var cod=deta.Catalogdata;
			var comment=deta.com_data;
			console.log(comment)
			if(comment.length>0){
				$(".meiyou").hide()
			}else{
				$(".meiyou").show()
			}
			$(".banner img").attr("src",imgUrl+deta.logo)
			$(".int_tit").html(deta.name)
			$(".int_p").html(deta.teacher.name)
			$("#pin").attr("tid",deta.id)
			var morng="";
			var str1 = deta.price
			if(cod.length>1){
				if(cod[1].price==undefined||!(cod[1].price)){
					str2=false
				}else{
					var str2 =cod[1].price;
					str2 = str2.replace(/^(\d+)\.(\d+)/,function($0,$1,$2){
						if($2 === '00'){
							return $1
						}
					})
				}
			}else{
				str2=false
			}
			str1 = str1.replace(/^(\d+)\.(\d+)/,function($0,$1,$2){
				if($2 === '00'){
					return $1
				}
			})
			if(str2){
				morng='<a class="small">¥</a>'+str2+" - "
			}else{
				morng=""
			}
			var cen=morng+'<a class="small">¥</a>'+str1;
			console.log(cen)
			$(".int_zi").html(cen)
			$(".int_img>img").attr("src",imgUrl+deta.course_desc)
			for (var i=0;i<cod.length;i++) {
				var mathe=i+1;
				var codlist=`<div class="cataloga" id="${cod[i].id}">
						<div class="cat_tit">课时${mathe}:${cod[i].name}</div>
						<div class="cat_fot">
							<a class="cat_time">${timer(cod[i].create_time)}</a>
							<a class="cat_name">1000+已报名</a>
						</div>
						<span><img src="../img/no.png"></span>
					</div>`;
					$(".catalog").append(codlist)
			}
			for(var i=0;i<comment.length;i++){
				var com=`<div class="com">
							<div class="conm_fl"><img src="../img/tu.jpg" /></div>
							<div class="com_rt">
								<dd>${comment[i].name?comment[i].name:comment[i].phone}</dd>
								<h3>${comment[i].content} </h3>
								<div class="qi">${comment[i].create_time}</div>
							</div>
						</div>`;
				$(".cent").html(com)
			}
		}
	});

	function timer(dat){
		var t=dat*1000;
		var hour = Math.floor(t / 1000 / 60 / 60 % 24);
		var min = Math.floor(t / 1000 / 60 % 60);
		var sec = Math.floor(t / 1000 % 60);
		if(hour < 10) {
			hour = "0" + hour;
		}
		if(min < 10) {
			min = +min;
		}
		if(sec < 10) {
			sec = sec;
		}
		var yi=hour+":"+min+":"+sec
		return yi
	}
})