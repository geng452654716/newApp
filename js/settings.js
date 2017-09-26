$(function(){

    $('.name').html(user);
    $('.user .follow').html(sessionStorage.getItem('followList_length'));

    $('.button')[0].addEventListener('touchstart',function(){
        removeCookie('userInfo');
        history.go(-1);
    })
})