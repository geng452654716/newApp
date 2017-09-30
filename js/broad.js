$(function(){
	let id = '' + window.location.search.substr(1).split('=')[1];

	ajax('app.php/app_live_details',function(data){
		if(data.rt === 1){
			let Data = data.data;
			let money = Data.data.price;
			let endMoney = Data.data.start_price;
			var comTime = data.data.Catalogdata[0].start_time.replace(/\s/,'T');
			money = money.replace(/^(\d+)\.(\d+)/,function($0,$1,$2){
				if($1 === '0' && $2 === '00'){
					return '免费';
				}
				if($1 !== '0' && $2 ==='00'){
					return '<a class="small">¥</a>' + $1;
				}
				if($1 !== '0' && $2 !== '00'){
					return `<a class="small">¥</a>${$1}.<span style='font-size:${28/50}rem'>${$2}</span>`;
				}
			})

			if(endMoney){
				endMoney = endMoney.replace(/^(\d+)\.(\d+)/,function($0,$1,$2){
					if($1 !== '0' && $2 ==='00'){
						return '<a class="small">¥</a>' + $1 + ' -';
					}
					if($1 !== '0' && $2 !== '00'){
						return `<a class="small">¥</a>${$1}.<span style='font-size:${28/50}rem'>${$2}</span> -`;
					}
				})
			}else{
				endMoney = '';
			}

			let str = `
				<div class="banner"><img src="${imgUrl + Data.data.logo}"></div>
				<div class="bro_tit">课程信息
				</div>
				<ul class="con">
					<div class="intr">
						<div class="int_tit">
							${Data.data.name}
						</div>
						<div class="int_p">
							<p>${Data.teacher.name}</p>
							<span>套课：${Data.data.count}课时</span>
						</div>
						<div class="int_foot">
							<div class="int_zi">
								${endMoney}
								${money}
							</div>
							<div class="int_peo">1000人报名</div>
						</div>
						<span class="guan">${Data.teacher.create_time}</span>
					</div>
					<div class="int_img"><img src="${imgUrl + Data.data.course_desc}"></div>
				</ul>
			`
			$('.bao').html(`${Data.data.ispay === 2?'立即报名':Data.data.button}`)
			$('.content').html(str);
			//付款弹框
			let bombBox = $('.bombBox')[0];
			var payment = bombBox.getElementsByClassName('payment');
			payment = [...payment];
			payment.forEach((e,i) => {
				if(i === 0){
					$(e).find('strong').html(`￥${Data.data.price}`)
				}else if(i === 1){
					$(e).find('strong').html(`${Data.data.start_price?`￥${Data.data.start_price}`:'￥0.00'}`)
				}
				$(e).mobileClick(function(e){
					$('.payment').removeClass('active');
					$(this).addClass('active');
				})
			})
			//报名点击
			$('.bao').mobileClick(function(e){
				if(Data.data.ispay === 2){
					$('.mask').show();
					$('.bombBox').css({
						bottom:25/50 + 'rem'
					});
				}
				//判断按钮状态跳转
				if(Data.data.ispay !== 2 && Data.data.button === '回放'){
					window.location.href = 'prespPlay.html?class_id='+ data.data.Catalogdata[0].id;
				}else if(Data.data.ispay !== 2 && Data.data.button === '直播中'){
					window.location.href = 'live.html?class_id='+ data.data.Catalogdata[0].id;
				}else if(Data.data.ispay !== 2 && Data.data.button === '即将开始'){
					let diff = Time(comTime);
					if(diff <= 5 && diff >= 0){
						window.location.href = 'live.html?class_id='+ data.data.Catalogdata[0].id;
					}
				}
			})
			if(Data.data.ispay !== 2 && Data.data.button === '即将开始'){
				let diff = Time(comTime);
				if(diff <= 5 && diff >= 0){
					$('.bao').css({
						background:'#ffa100',
						color:'#fff'
					})
				}
			}else if(Data.data.ispay !== 2 && Data.data.button === '直播中'){
				$('.bao').css({
					background:'#ffa100',
					color:'#fff'
				})
			}
		}
	},{id},'post')
	changeYouHui();
	var you = true;
	$('.youhui').mobileClick(function(){
		you = !you;
		changeYouHui();
	})
	$('.mask').mobileClick(function(){
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


//时间判断函数
function Time(start){
	let nowTime = new Date(getServerDate());
	let startTime = new Date(start).getTime();
	let diff = startTime - nowTime;
	if(diff > 0){
		var day = Math.floor(diff / 1000 / 60 / 60 / 24);
		var hour = Math.floor(diff / 1000 / 60 / 60 % 24);
		var min = Math.floor(diff / 1000 / 60 % 60);
		var sec = Math.floor(diff / 1000 % 60);
		return min;
	}else{
		return -1;
	}
}

//获取服务器时间
function getServerDate() {
    return new Date($.ajax({ async: false }).getResponseHeader("Date"));
}