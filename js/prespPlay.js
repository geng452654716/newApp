$(function() {
    $('.nav div').mobileClick(function(){
        $('.list').hide();
        $('.list').eq($(this).index()).show();
        $('.nav div').removeClass('active');
        $(this).addClass('active');
    })
    //课程id
    let id = '' + window.location.search.substr(1).split('=')[1];

    //请求视频数据
    ajax('app.php/app_huifang_play',function(data){
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
                li.class_id = e.id;
                var str = `
                    <p>第${toChineseNum(i+1)}课：${e.name}</p>
                    <div class="small_icon">
                        <time>${videoTime(e.start_time,e.end_time)}</time>
                        <span>1000+已报名</span>
                    </div>
                    <a href="#">
                        <div class="startPlay"></div>
                    </a>
                `
                li.innerHTML = str;
                $('.class_list ul').append(li);
            })
            //根据id判断列表class
            $('.class_list li').each((i,e) => {
                if(e.class_id === id){
                    $(e).addClass('active');
                }
            })
            //点击列表刷新网页更换id
            $('.class_list li').mobileClick(function(){
                location.href = 'prespPlay.html?class_id=' + $(this)[0].class_id;
            })

            //关注 && 取消关注
            $('.guanzhu').mobileClick(function(){
                if($('.guanzhu').html() === '+关注'){
                    ajax('app.php/add_follow',function(data){
                        if(data.rt === 1){
                            $('.guanzhu').html('已关注');
                        }
                    },{teacherid:teacher.id},'post')
                }else{
                    ajax('app.php/del_follow',function(data){
                        if(data.rt === 1){
                            $('.guanzhu').html('+关注');
                        }
                    },{teacherid:teacher.id},'post')
                }
            })
        }
    },{id},'post')
})


//计算视频总时长
function videoTime(start,end){
    let startTime = new Date(start *1000);
    let endTime = new Date(end *1000);
    let startH = startTime.getHours();
    let startM = startTime.getMinutes();
    let startS = startTime.getSeconds();
    let endH = endTime.getHours();
    let endM = endTime.getMinutes();
    let endS = endTime.getSeconds();
    let H = endH - startH;
    let M = endM - startM;
    let S = endS - startS;
    return toTow(H) + ':' + toTow(M) + ':' + toTow(S);
    //补零函数
    function toTow(num){
        return num<10? '0'+num:num;
    }
}

//阿拉伯数字转中文数字
function toChineseNum(str) {
    str = ('' + str).trim().replace(/^0*/, ''); //去掉前面修饰的0
    var match = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '零'];
    return ('0000' + str).substr((str.length % 4) || 4).replace(/(\d){4}/g, function (_str, endIndex, startIndex) {
        var dot = (((str.length - 1) / 4) >> 0) - ((startIndex / 4) >> 0);
        var prefix = (function getPrfix(dot) {
            return (dot > 2 ? (+_str ? (dot == 3 ? '万' : (getPrfix(dot - 1) + '万')) : '') : (dot == 1 ? (+_str ? '万' : '') : (dot == 2 ? '亿' : '')));
        })(dot);
        /0+$/g.test(_str) && (prefix += match[10]); //处理单元内后半部分有零的地方
        return (+_str) ? (_str.replace(/(\d)(\d)(\d)(\d)/g, function ($0, $1, $2, $3, $4) {
            !match[$1] && (match[$2] ? ($1 = 10) : (match[$3] ? ($2 = 10) : (match[$4] ? ($3 = 10) : ''))); //处理相邻单元前半部分
            match[$1] && match[$3] && !match[$2] && ($2 = 10), match[$2] && match[$4] && !match[$3] && ($3 = 10), match[$1] && match[$4] && !match[$3] && !match[$2] && ($3 = 10); //中间两个连续为0，只是获取最后一个
            return (match[$1] && ($1 < 10 ? (match[$1] + '千') : match[$1])) + (match[$2] && ($2 < 10 ? (match[$2] + '百') : match[$2])) + (match[$3] && ($3 < 10 ? ($3 == 1 ? '十' : (match[$3] + '十')) : match[$3])) + (match[$4] && match[$4]);
        }) + prefix) : (prefix);
    }).replace(/^零*/g, '').replace(/零*$/g, '').replace(/(零)*/g, '$1').replace(/零亿/g, '亿') || match[10]; //处理连续零的问题
}
