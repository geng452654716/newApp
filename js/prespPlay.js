$(function() {
    $('.nav div').mobileClick(function(){
        $('.list').hide();
        $('.list').eq($(this).index()).show();
        $('.nav div').removeClass('active');
        $(this).addClass('active');
    })

    let id = '' + window.location.search.substr(1).split('=')[1];

    //请求视频数据
    ajax('app.php/app_huifang_play',function(data){
        console.log(data);
        if(data.rt === 1){
            const Class = data.data.zb_sel_class;
            const classList = data.data.web_class_list;
            const teacher = data.data.teacher_data;
            //视频
            $('video').attr('src','http://oss.softlinkonline.cn/public/' + Class.video_url);
            $('.play').mobileClick(function(){
                $('video')[0].play();
                $(this).hide();
            })
            //讲师
            let str = `
            <div class="title">
                本期讲师
            </div>
            <div class="teacher clear">
                <div class="tx">
                    <img src="${imgUrl + teacher.webimage}" alt="">
                </div>
                <div class="name">
                    <h4>${teacher.name}</h4>
                    <span>${teacher.title}</span>
                </div>
                <div class="guanzhu">${data.data.is_follow === 1?'已关注':'+关注'}</div>
            </div>
            `
            $('.teacher_warp').html(str);
            //课程列表
            classList.forEach((e,i) => {
                var li = document.createElement('li');
                li.class_id = classList.id;
                var str = `
                    <p>第一课：GRE备考整体概述</p>
                    <div class="small_icon">
                        <time>01:30:00</time>
                        <span>1000+已报名</span>
                    </div>
                    <a href="#">
                        <div class="startPlay"></div>
                    </a>
                `
                li.innerHTML = str;
                $('.class_list ul').append(li);
            })
            
        }
    },{id},'post')
})