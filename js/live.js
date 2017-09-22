$(function() {
    $(document).on('click','.nav div',function(){
        console.log(1);
        $('.list').hide();
        $('.list').eq($(this).index()).show();
        $('.nav div').removeClass('active');
        $(this).addClass('active');
    })
})