$(function(){
	var reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
	$(".ms_first").change(function(){
		var phoneNum = $(".ms_first").val();//手机号码
		var flag = reg.test(phoneNum); //true
		var yan=$(".ms_last").length;
		function CheckPassWord(password) {//必须为字母加数字且长度不小于6位
		   var str = password;
		    if (str == null || str.length <6) {
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
	})
	$(".sign").click(function(){
		window.location.href="signin.html"
	})
})
