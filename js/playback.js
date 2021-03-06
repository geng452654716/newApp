$(function() {
	//阿拉伯数字转中文数字
	function toChineseNum(str) {
		str = ('' + str).trim().replace(/^0*/, ''); //去掉前面修饰的0
		var match = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '零'];
		return('0000' + str).substr((str.length % 4) || 4).replace(/(\d){4}/g, function(_str, endIndex, startIndex) {
			var dot = (((str.length - 1) / 4) >> 0) - ((startIndex / 4) >> 0);
			var prefix = (function getPrfix(dot) {
				return(dot > 2 ? (+_str ? (dot == 3 ? '万' : (getPrfix(dot - 1) + '万')) : '') : (dot == 1 ? (+_str ? '万' : '') : (dot == 2 ? '亿' : '')));
			})(dot);
			/0+$/g.test(_str) && (prefix += match[10]); //处理单元内后半部分有零的地方
			return(+_str) ? (_str.replace(/(\d)(\d)(\d)(\d)/g, function($0, $1, $2, $3, $4) {
				!match[$1] && (match[$2] ? ($1 = 10) : (match[$3] ? ($2 = 10) : (match[$4] ? ($3 = 10) : ''))); //处理相邻单元前半部分
				match[$1] && match[$3] && !match[$2] && ($2 = 10), match[$2] && match[$4] && !match[$3] && ($3 = 10), match[$1] && match[$4] && !match[$3] && !match[$2] && ($3 = 10); //中间两个连续为0，只是获取最后一个
				return(match[$1] && ($1 < 10 ? (match[$1] + '千') : match[$1])) + (match[$2] && ($2 < 10 ? (match[$2] + '百') : match[$2])) + (match[$3] && ($3 < 10 ? ($3 == 1 ? '十' : (match[$3] + '十')) : match[$3])) + (match[$4] && match[$4]);
			}) + prefix) : (prefix);
		}).replace(/^零*/g, '').replace(/零*$/g, '').replace(/(零)*/g, '$1').replace(/零亿/g, '亿') || match[10]; //处理连续零的问题
	}
	$('.nav div').mobileClick(function() {
		$('.list').hide();
		$('.list').eq($(this).index()).show();
		$('.nav div').removeClass('active');
		$(this).addClass('active');
	})
	var str = location.href; //获取到整个地址
	var oo = str.lastIndexOf("\/")
	var type = str.substring(oo + 1, str.length)
	var ac = str.lastIndexOf("d/")
	var lo = str.lastIndexOf("/type")
	var num = str.substring(ac + 2, lo)
	if(type == 2) {
		$.ajax({
			type: "post",
			url: "http://ceshi.softlinkonline.cn/app.php/app_play",
			async: true,
			dataType: "json",
			data: {
				vedio: num,
				course: type
			},
			success: function(data) {
				var data = data.data;
				console.log(data)
				var cod = data.datalist;
				$("video").attr("src", 'http://oss.softlinkonline.cn/public/' + data.play_data.video_url);
				$(".teacher_warp .title").html(data.teacher.name)
				$(".class_content .title").html(data.play_data.title)
				$(".class_content ul").html(data.play_data.content)
				$(".tx").attr("src", imgUrl + data.teacher.url)
				$(".name h4").html(data.teacher.name)
				$(".name span").html(data.teacher.title)
				$(".guanzhu").html(`${data.is_follow === 1?'已关注':'+关注'}`)
				$(".guanzhu").attr("tid",data.teacher.id)
				for(var i = 0; i < cod.length; i++) {
					var a=i+1;
					var stri = ` <li class="${data.play_data.nowid===cod[i].id?'active':''}" id="${cod[i].id}" isplay="${cod[i].is_pay}">
                        <p>第${toChineseNum(a)}课：${cod[i].name}</p>
                        <div class="small_icon">
                            <time>01:30:00</time>
                            <span>1000+已报名</span>
                        </div>
                        <a href="#">
                            <div class="startPlay"></div>
                        </a>
                    </li>`;
				$(".class_list ul").append(stri)
				}
				$('.play').mobileClick(function(){
	                $('video')[0].play();
	                $(this).hide();
	            })
			}
		});
	} else {
		$.ajax({
			type: "post",
			url: "http://ceshi.softlinkonline.cn/app.php/app_play",
			async: true,
			dataType: "json",
			data: {
				s_vedio: num,
				course: type
			},
			success: function(data) {
				var data = data.data;
				console.log(data)
				var cod = data.datalist;
				$("video").attr("src", 'http://oss.softlinkonline.cn/public/' + data.play_data.video_url);
				$(".teacher_warp .title").html(data.teacher.name)
				$(".class_content .title").html(data.play_data.title)
				$(".class_content ul").html(data.play_data.content)
				$(".tx").attr("src", imgUrl + data.teacher.url)
				$(".name h4").html(data.teacher.name)
				$(".name span").html(data.teacher.title)
				$(".guanzhu").html(`${data.is_follow === 1?'已关注':'+关注'}`)
				for(var i = 0; i < cod.length; i++) {
					var a=i+1;
					var stri = ` <li class="${data.play_data.nowid===cod[i].id?'active':''}" id="${cod[i].id}" isplay="${cod[i].is_pay}">
                        <p>第${toChineseNum(a)}课：${cod[i].name}</p>
                        <div class="small_icon">
                            <time>01:30:00</time>
                            <span>1000+已报名</span>
                        </div>
                        <a href="#">
                            <div class="startPlay"></div>
                        </a>
                    </li>`;
				$(".class_list ul").append(stri)
				}
				$('.play').mobileClick(function(){
	                $('video')[0].play();
	                $(this).hide();
	            })
			}
		});
	}
	$(".guanzhu").mobileClick(function(){
		var tid=$(this).attr("tid")
		if($(this).html()=="+关注"){
			$.ajax({
				type:"post",
				url:"http://ceshi.softlinkonline.cn/app.php/add_follow",
				async:true,
				dataType:"json",
				data:{
					teacherid:num
				},success:function(data){
					console.log(data)
					$(".guanzhu").html("已关注")
				}
			});
		}else{
			$.ajax({
				type:"post",
				url:"http://ceshi.softlinkonline.cn/app.php/del_follow",
				async:true,
				dataType:"json",
				data:{
					teacherid:num
				},success:function(data){
					console.log(data)
					$(".guanzhu").html("+关注")
				}
			});
		}
	})
})