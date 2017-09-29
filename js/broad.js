$(function(){
	let id = '' + window.location.search.substr(1).split('=')[1];

	ajax('app.php/app_live_details',function(data){
		if(data.rt === 1){
			let Data = data.data;
			let money = Data.data.price;
<<<<<<< HEAD
=======
			let endMoney = Data.data.start_price;
>>>>>>> origin/master
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
<<<<<<< HEAD
			console.log(money);
=======

			if(endMoney){
				endMoney = endMoney.replace(/^(\d+)\.(\d+)/,function($0,$1,$2){
					if($1 !== '0' && $2 ==='00'){
						return '- <a class="small">¥</a>' + $1;
					}
					if($1 !== '0' && $2 !== '00'){
						return `- <a class="small">¥</a>${$1}.<span style='font-size:${28/50}rem'>${$2}</span>`;
					}
				})
			}else{
				endMoney = '';
			}

>>>>>>> origin/master
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
<<<<<<< HEAD
							<span>套课：5课时</span>
=======
							<span>套课：${Data.data.count}课时</span>
>>>>>>> origin/master
						</div>
						<div class="int_foot">
							<div class="int_zi">
								${money}
<<<<<<< HEAD
							
=======
								${endMoney}
>>>>>>> origin/master
							</div>
							<div class="int_peo">1000人报名</div>
						</div>
						<span class="guan">${Data.teacher.create_time}</span>
					</div>
					<div class="int_img"><img src="${imgUrl + Data.data.course_desc}"></div>
				</ul>
<<<<<<< HEAD
				<div class="bao">${Data.data.button}</div>
			`
			$('.content').html(str);
=======
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
				if(Data.data.button === '精彩回放'){
					window.location.href = 'prespPlay.html?class_id='+data.data.Catalogdata[0].id;
				}else if(Data.data.button === '直播中'){

				}else if(Data.data.button === '即将开始'){

				}
			})
>>>>>>> origin/master
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
