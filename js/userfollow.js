$(function(){
    let teacherList = $('.teacherList')[0];
    var lis = teacherList.getElementsByTagName('li');
    let startX = null;
    let next = null;
    move();

    //滑动
    function move(){
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
    }

    //判断用户名
    $('.user .name').html(user);

    //请求关注列表接口
    ajax('app.php/follow_list',function(data){
        if(data.rt === 1){
            const Data = data.data.follow_list;
            if(Data){
                $('.follow').html(Data.length);
                if(Data.length === 0){
                    $('.teacherList').html(`<p style="text-align:center;font-size:${25/50}rem">暂无数据</p>`);
                }
                Data.map((e,i) => {
                    let li = document.createElement('li');
                    li.teacher_id = e.id;
                    let str = `
                    <div class="tx">
                        <img src="${imgUrl + e.yuanimg}" alt="">
                    </div>
                    <div class="info">
                        <div class="name">${e.name}</div>
                        <p>${e.title}</p>
                    </div>
                    <div class="button">
                        取消<br> 关注
                    </div>
                    `
                    li.innerHTML = str;
                    $('.teacherList ul').append(li);
    
                    //取消关注接口
                    let button = li.getElementsByClassName('button')[0];
                    teacherid = e.id;
                    button.addEventListener('touchstart',function(){
                        ajax('app.php/del_follow',function (data) {
                            if(data.rt === 1){
                                li.remove($(this).parent());
                                Data.length--;
                                $('.follow').html(Data.length);
                                sessionStorage.setItem('followList_length',Data.length);
                                if(Data.length === 0){
                                    $('.teacherList').html(`<p style="text-align:center;font-size:${25/50}rem">暂无数据</p>`);
                                }
                            }
                        },{teacherid},'post')
                    })
                })
            }
            move();
            }
    },{},'post')
})