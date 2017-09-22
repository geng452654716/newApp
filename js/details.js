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
			bottom:'0.5333333333333333rem'
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
})