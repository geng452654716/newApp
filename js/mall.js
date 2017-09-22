$(function(){
	var wrapper = document.getElementsByClassName('wrapper')[0];
    let scroll = new BScroll(wrapper, {
        scrollY: true,
		click: true
	})
	
    scroll.refresh();
    document.addEventListener('click',function(){
		scroll.refresh();
		scroll2.refresh();
	})
	var over = document.getElementsByClassName('over')[0];
	let scroll2 = new BScroll(over,{
		scrollX: true,
		click: true,
	})

	var lubo = document.getElementsByClassName('lubo')[0];
	var luboChild = lubo.children;
	lubo.style.width = luboChild.length * 73 + '%';

	$(".qian").click(function(){
		$(".bg").show()
		$(".coupon").show()
	})
	$(".cuo").click(function(){
		$(".bg").hide()
		$(".coupon").hide()
		$(".cou_one").show()
		$(".doubt").show()
		$(".cou_two").hide()
		$(".cou_thr").hide()
		$(".coupon").css({"height":"10.673913043478262rem"})
	})
	$(".doubt").click(function(){
		$(".cou_one").hide()
		$(".cou_thr").hide()
		$(".doubt").hide()
		$(".cou_two").show()
		$(".coupon").css({"height":"10.673913043478262rem"})
	})
	$(".rightoff").click(function(){
		$(".cou_one").hide()
		$(".cou_two").hide()
		$(".cou_thr").show()
		$(".coupon").css({"height":"4.673913rem"})
	})
	$(".Boutique").click(function(){
		window.location.href="boutique.html"
	})
	$(".dataset").click(function(){
		window.location.href="dataset.html"
	})
	$(".morev").click(function(){
		window.location.href="Micro.html"
	})
	$(document).on("click",".pre_con",function(){
		window.location.href="details.html"
	})
})
    