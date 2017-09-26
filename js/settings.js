$(function(){
    
    $('.name').html(user);

    $('.button')[0].addEventListener('touchstart',function(){
        removeCookie('userInfo');
        history.go(-1);
    })
})