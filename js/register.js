$(function () {
	var reg = /^[1-9][3|4|5|7|8][0-9]{9}$/; //验证规则


	$(".ms_first").change(function () {
		var phoneNum = $(".ms_first").val();//手机号码
		var flag = reg.test(phoneNum); //true
		var yan = $(".ms_last").length;
	})

	let phoneAdopt = null;
	let codeAdopt = null;
	let pasAdopt = null;
	let phone = '';
	let password = '';
	let code = '';
	let timer = null;
	let time = 60;
	let onoff = true;
	//账号验证
	$('#phone')[0].addEventListener('input', function () {
		phoneAdopt = /^[1-9][34587]\d{9}$/.test($(this).val());
		if (!phoneAdopt) {
			$('.message').html('请输入正确的手机号');
		} else {
			$('.message').html('');
		}
		phone = $(this).val();
		blue();
	})


	//验证码验证
	$('#code')[0].addEventListener('input', function () {
		codeAdopt = $(this).val().length == 6;
		if (codeAdopt) {
			$('.message').html('');
		} else {
			$('.message').html('请输入正确的验证码');
		}
		code = $(this).val();
		blue();
	})

	//密码验证
	$('#password')[0].addEventListener('input', function () {
		pasAdopt = CheckPassWord($(this).val());
		if (pasAdopt) {
			$('.message').html('');
		} else {
			$('.message').html('密码格式有误');
		}
		password = $(this).val();
		blue();
	})

	//获取短信验证码
	$('#btn')[0].addEventListener('touchstart',function(){
		let _this = $(this);
		if(onoff){
			onoff = false;
			timer = setInterval(function(){
				if(time === 60 && phoneAdopt){
					ajax('app.php/send',function(data){},{phone},'post')
				}
				time--;
				_this.val(`${time}秒后重新获取`)
				if(time === 0){
					clearInterval(timer);
					time = 60;
					onoff = true;
				}
			},1000)
		}
	})

	//注册按钮
	$('.inpbtn input')[0].addEventListener('touchstart',function(){
		if(blue()){
			ajax('app.php/regadd',function(data){
				console.log(data);
				if(data.rt === 1){
					setCookie('userInfo',data.data.user,30);
					window.location.href = 'newApp/index/'
				}else{
					$('.message').html('该手机号已经注册过');
				}
			},{phone,code,pwd:password},'post')
		}
	})
	
	function CheckPassWord(password) {//必须为字母加数字且长度不小于6位
		var str = password;
		if (str == null || str.length < 6) {
			return false;
		}
		var reg1 = new RegExp(/^[0-9A-Za-z]+$/);
		if (!reg1.test(str)) {
			return false;
		}
		var reg = new RegExp(/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/);
		if (reg.test(str)) {
			return true;
		} else {
			return false;
		}
	}


	function blue() {
		if(phoneAdopt && codeAdopt && pasAdopt){
			$('.inpbtn input').css({
				background: '#4285F4',
			})
			return true;
		}else{
			$('.inpbtn input').css({
				background: '#d8d8d8',
			})
			return false;
		}
	}
	$(".sign").click(function () {
		window.location.href = "signin.html"
	})
})
