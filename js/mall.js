$(function () {
	var wrapper = document.getElementsByClassName('wrapper')[0];
	let scroll = new BScroll(wrapper, {
		scrollY: true,
		click: true
	})

	scroll.refresh();

	var over = document.getElementsByClassName('over')[0];
	let scroll2 = new BScroll(over, {
		scrollX: true,
		click: true,
	})
	scroll2.refresh();

	var lubo = document.getElementsByClassName('lubo')[0];
	var luboChild = lubo.children;
	lubo.style.width = luboChild.length * 73 + '%';

	document.addEventListener('click', function () {
		scroll.refresh();
	})
	$(".qian")[0].addEventListener('touchstart',function () {
		$(".bg").show()
		$(".coupon").show()
	})
	$(".cuo")[0].addEventListener('touchstart',function () {
		$(".bg").hide()
		$(".coupon").hide()
		$(".cou_one").show()
		$(".doubt").show()
		$(".cou_two").hide()
		$(".cou_thr").hide()
		$(".coupon").css({ "height": "10.673913043478262rem" });
	})
	$(".doubt")[0].addEventListener('touchstart',function () {
		$(".cou_one").hide()
		$(".cou_thr").hide()
		$(".doubt").hide()
		$(".cou_two").show()
		$(".coupon").css({ "height": "10.673913043478262rem" })
	})
	$(".rightoff")[0].addEventListener('touchstart',function () {
		$(".cou_one").hide()
		$(".cou_two").hide()
		$(".cou_thr").show()
		$(".coupon").css({ "height": "4.673913rem" })
	})
	$(".Boutique")[0].addEventListener('touchstart',function () {
		window.location.href = "boutique.html"
	})
	$(".dataset")[0].addEventListener('touchstart',function () {
		window.location.href = "dataset.html"
	})
	$(".morev")[0].addEventListener('touchstart',function () {
		window.location.href = "Micro.html"
	})
	$(document).on("click", ".pre_con", function () {
		window.location.href = "details.html"
	})
})
