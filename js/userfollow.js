$(function(){
    let teacherList = $('.teacherList')[0];
    var lis = teacherList.getElementsByTagName('li');
    let startX = null;
    let next = null;
    //滑动
    for(let i = 0;i<lis.length;i++){
        lis[i].left = 0;
        lis[i].addEventListener('touchstart',function(e){
            startX = e.changedTouches[0].clientX;
            if(this.left == 0 && next){
                next.style.transition = 'all .5s';
                next.style.transform  = `translateX(${0}rem)`;
                next.left = 0;
            }
            this.style.transition = null;
            next = this;
        })
        lis[i].addEventListener('touchend',function(e){
            next == null;
            let endX = e.changedTouches[0].clientX;
            if(startX - endX > 150){
                this.left = -127;
                this.style.transition = 'all .5s';
                this.style.transform  = `translateX(${-130 / 50}rem)`;
            }
            if(endX - startX > 150 ){
                this.left = 0;
                this.style.transition = 'all .5s';
                this.style.transform  = `translateX(${0}rem)`;
            }
        })
    }


    //判断用户名
    $('.user .name').html(user);

    //请求关注列表接口
    ajax('app.php/code_list',function(data){
        console.log(data);
    },{},'post')
})