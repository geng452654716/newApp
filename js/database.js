$(function(){
    let payment = false;
    if(payment){
        study();
    }else{
        $('.bookData .button').html('￥19.90');
    }
    $('.mask').click(() => {
        $('.mask').hide();
        $('.payment').css({
            bottom:-999/50 + 'rem'
        });  
        payment = false;
    })
    $('.bookData .button')[0].addEventListener('touchstart',function(){
        if(!payment){
            $('.mask').show();
            $('.payment').css({
                bottom:25/50 + 'rem'
            });   
        }else{
            window.location.href = 'http://www.baidu.com';
        }
    })
    $('.payment .button').click(() => {
        payment = true;
        $('.mask').hide();
        $('.payment').css({
            bottom:-999/50 + 'rem'
        }); 
        $('.payment .button').unbind();
        study();
    })
    function study(){
        $('.bookData .button').html('立即学习');
        $('.bookData .button').click(() => {
            window.location.href = "#";
        })
    }
})