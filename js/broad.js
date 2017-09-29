$(function(){
	$(document).on("click",".bao",function(){
		var name=$(this).html();
		if(name=="立即报名"){
			window.location.href="../index/sign.html"
		}
	})

	let id = '' + window.location.search.substr(1).split('=')[1];

	ajax('app.php/app_live_details',function(data){
		if(data.rt === 1){
			let Data = data.data;
			let money = Data.data.price;
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
			console.log(money);
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
							<span>套课：5课时</span>
						</div>
						<div class="int_foot">
							<div class="int_zi">
								${money}
							
							</div>
							<div class="int_peo">1000人报名</div>
						</div>
						<span class="guan">${Data.teacher.create_time}</span>
					</div>
					<div class="int_img"><img src="${imgUrl + Data.data.course_desc}"></div>
				</ul>
				<div class="bao">${Data.data.button}</div>
			`
			$('.content').html(str);
		}
	},{id},'post')
})
