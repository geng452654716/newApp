$(function () {
	$(document).on("click", ".banner", function () {
		window.location.href = "../index/broadcast.html"
	})
	$(document).on("click", ".zhi_son", function () {
		window.location.href = "../index/broadcast.html?class_id=" + this.class_id;
	})
	$(document).on("click", ".head_sou", function () {
		window.location.href = "search.html"
	})
	$(document).on("click", ".gao", function () {
		window.location.href = "free.html"
	})

	ajax('app.php/app_index', function (data) {
		if (data.rt === 1) {
			if(data.data.course_live){
				let Data = data.data.course_live;
				let str = `
					<div class="ban_tit">
						本周直播推荐
					</div>
					<div class="ban_tu">
						<img src="${imgUrl + Data.weblogo}" />
						<div class="ban_shi jijiang">${Data.zb_text}</div>
					</div>
					<div class="ban_zi clear">
						<a class="ban_zia">${Data.name}</a>
						<a class="ban_zib">${Data.start_time}</a>
					</div>
					<div class="ban_sp">
						<strong>${Data.teacher_name}</strong>
						<span>套课：${Data.count}课时</span>
						<p>
							${Data.price === '0.00'?'免费':'<a class="small">¥</a>'+Data.price}
						</p>
					</div>
					<div class="ban_bao">1000人已报名</div>
				`;
				$('.banner').html(str);
			}
			if(data.data.hf_course_live){
				data.data.hf_course_live.map((e,i) => {
					let div = document.createElement('div');
					div.class_id = e.id;
					div.teacher_id = e.teacher_id;
					div.className = 'zhi_son';
					let str = `
						<div class="zhi_tu">
							<img src="${imgUrl + e.weblogo}">
							<span class='huifang'>${e.zb_text}</span>
						</div>
						<div class="gao_tit">
							${e.name}
						</div>
						<div class="gao_p">
							${e.start_time}
						</div>
						<div class="gao_xin">
							<span>套课:${e.count}课时</span>
							<p>
								${e.price === '0.00'?'<a>免费</a>':'<a class="small">¥</a>6'}
								${e.zd_price?'-':''}
								${e.zd_price?`<a class="small">¥</a>${e.zd_price}`:''}
							</p>
						</div>
						<div class="ban_bao">1000人报名</div>
					`
					div.innerHTML = str;
					$('.details').append(div);
				})
			}
		}
	},{} , 'post')
})
