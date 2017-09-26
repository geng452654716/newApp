$(function () {
	let target = null;
	$(".login")[0].addEventListener('touchstart', function () {
		$(".msm").removeClass("blue")
		$(this).addClass("blue")
		$(".account").show()
		$(".msmlogin").hide()
		target = 'acc';
	})
	$(".msm")[0].addEventListener('touchstart', function () {
		$(".login").removeClass("blue")
		$(this).addClass("blue")
		$(".account").hide()
		$(".msmlogin").show()
		target = 'short'
	})
	$(".sign")[0].addEventListener('touchstart', function () {
		window.location.href = "register.html"
	})

	//账号密码登陆
	var name = '';
	var pwd = '';
	var accAdopt = null;

	//账号输入判断
	$('#acc_iphone')[0].addEventListener('input', function () {
		accAdopt = /^[1-9][34587]\d{9}$/.test($(this).val());
		if (!accAdopt) {
			$('.message').html('请输入正确的手机号');
		} else {
			$('.message').html('');
		}
		name = $(this).val();
		blue();
	})

	//密码输入判断
	$('#password')[0].addEventListener('input', function () {
		if ($(this).val()) {
			pwd = $(this).val();
			$('.message').html('');
		} else {
			$('.message').html('请输入正确的密码');
		}
		blue();
	})

	

	var shortAdopt = null;
	var timer = null;
	var time = 60;
	var onoff = true;
	var phone = null;
	var code = null;

	//短信验证码登陆
	$('#short_iphone')[0].addEventListener('input', function () {
		shortAdopt = /^[1-9][34587]\d{9}$/.test($(this).val());
		if (!shortAdopt) {
			$('.message').html('请输入正确的手机号');
		} else {
			$('.message').html('');
		}
		blue();
		phone = $(this).val();
	})

	//获取验证码
	$('#btn')[0].addEventListener('touchstart', function () {
		let _this = $(this);
		let phone = $('#short_iphone').val();
		if (shortAdopt && onoff) {
			onoff = false;
			timer = setInterval(function () {
				if (time === 60) {
					ajax('app.php/k_login', function (data) {}, {phone}, 'post')
				}
				time--;
				_this.val(`${time}秒后重新获取`);
				if (time === 0) {
					clearInterval(timer);
					onoff = true;
					_this.val(`重新获取`);
					time = 60;
				}
			}, 1000)
		} else {
			$('.message').html('请输入正确的手机号');
		}
	})

	//验证码输入判断
	$('#code')[0].addEventListener('input',function(){
		blue();
		code = $(this).val();
	})
	

	//登陆按钮
	$('.inpbtn input')[0].addEventListener('touchstart', function () {
		if (accAdopt && $('#password').val() !== '' && target === 'acc') {
			ajax('app.php/d_login', function (data) {
				setCookie('userInfo', data.data.session_user)
			}, { name, pwd }, 'post');
		}

		if(shortAdopt && $('#code').val() !== '' && target === 'short'){
			ajax('app.php/yzm_login', function (data) {
				console.log(data);
				if(data.rt == 1){
					setCookie('userInfo', data.data.session_user);
				}
			}, { phone, code }, 'post');
		}
	})

	//登陆按钮背景颜色判断
	function blue() {
		if (accAdopt && $('#password').val() !== '' ) {
			$('.inpbtn input').css({
				background: '#4285F4',
			})
		} else {
			$('.inpbtn input').css({
				background: '#d8d8d8',
			})
		}
		if(shortAdopt && $('#code').val() !== ''){
			$('.inpbtn input').css({
				background: '#4285F4',
			})
		}else {
			$('.inpbtn input').css({
				background: '#d8d8d8',
			})
		}
	}

})


