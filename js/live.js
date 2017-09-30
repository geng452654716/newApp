$(function () {
    
    $(document).on('click', '.nav div', function () {
        $('.list').hide();
        $('.list').eq($(this).index()).show();
        $('.nav div').removeClass('active');
        $(this).addClass('active');
    })

    //课程id
    let id = '' + window.location.search.substr(1).split('=')[1];
    let currentTime = 0;

    //请求视频数据
    ajax('app.php/app_live_play', function (data) {
        if (data.rt === 1) {
            const Class = data.data.zb_sel_class;
            const classList = data.data.web_class_list;
            const teacher = data.data.teacher_data;
            currentTime = Class.counttime
            //视频
            $('video').attr('src', 'http://oss.softlinkonline.cn/public/' + Class.video_url);
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
                <div class="guanzhu">${data.data.is_follow === 1 ? '已关注' : '+关注'}</div>
            </div>
            `
            $('.teacher_warp').html(str);
            //课程列表
            classList.forEach((e, i) => {
                var li = document.createElement('li');
                li.class_id = e.id;
                var str = `
                    <p>第${toChineseNum(i + 1)}课：${e.name}</p>
                    <div class="small_icon">
                        <time>${videoStartTime(e.start_time)}</time>
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
            $('.class_list li').each((i, e) => {
                if (e.class_id === id) {
                    $(e).addClass('active');
                }
            })
            //点击列表刷新网页更换id
            $('.class_list li').mobileClick(function () {
                location.href = 'live.html?class_id=' + $(this)[0].class_id;
            })

            //关注 && 取消关注
            $('.guanzhu').mobileClick(function () {
                if ($('.guanzhu').html() === '+关注') {
                    ajax('app.php/add_follow', function (data) {
                        if (data.rt === 1) {
                            $('.guanzhu').html('已关注');
                        }
                    }, { teacherid: teacher.id }, 'post')
                } else {
                    ajax('app.php/del_follow', function (data) {
                        if (data.rt === 1) {
                            $('.guanzhu').html('+关注');
                        }
                    }, { teacherid: teacher.id }, 'post')
                }
            })
            var timer = null;

            $.ajax({type:"OPTIONS",url:"/",complete:function(x){
                var serveTime = x.getResponseHeader('Date');
                var nowDate = new Date(serveTime);
                var startDate = new Date(Class.start_time * 1000);
                var diffDate = startDate - nowDate;
                var total = diffDate / 1000 + 2;
                timer = setInterval(function () {
                    var changeDiffDate = StoH(total);
                    var M = changeDiffDate.min;
                    var S = changeDiffDate.sec;
                    if (total > 0) {
                        $('.prompt').show();
                        $('.prompt .m').text(toTow(M));
                        $('.prompt .s').text(toTow(S));
                        total--;
                    } else {
                        clearInterval(timer);
                        $('.play').show();
                        $('.prompt').hide();
                    }
                }, 1000)
            }})
            //倒计时
            

            //二维码
            $('.saoma img').attr('src', `${imgUrl + data.data.data_details.notice}`);
        }
    }, { id }, 'post')
    videoPlay();
    class Video {
        constructor(src) {
            this.video = liveVideo;
            this.status = null; //播放状态
            this.delay = 50;
        }
        play() {
            this.status = "playing";
            this.video.play();
            return this;
        }
        pause() {
            this.status = "paused";
            this.video.pause();
            return this;
        }
        setTime(time) {
            if (this.status == "playing") {
                this.video.currentTime = time;
                console.log("当前视频时间：" + this.video.currentTime);
                return time;
            }
            let that = this;
            that.play();
            $(that.video).one("playing", function () {
                that.video.currentTime = time;
                $(that.video).one("seeked", function () {
                    $(that.video).one("timeupdate", function () {
                        clearTimeout(that.timeout);
                        that.timeout = setTimeout(() => {
                            console.log("当前视频时间：" + that.video.currentTime);
                            if (that.status == "playing") {
                                that.play();
                            } else {
                                that.pause();
                            }
                        }, that.delay);
                    });
                })
            })
            return time;
        }
    }

    var newTime = new Video();
    function videoPlay() {
        //获取video
        var liveVideo = document.getElementById("liveVideo");
        //获取canvas画布
        var liveCanvas = document.getElementById("liveCanvas");
        //设置画布
        var liveCanvas2D = liveCanvas.getContext('2d');
        //设置setinterval定时器
        var bLiveVideoTimer = null;
        var play = document.getElementsByClassName('play')[0];
        var fullBtn = document.getElementsByClassName('full')[0];
        var videoBox = document.getElementsByClassName('videoBox')[0];

        var root = parseInt(document.documentElement.style.fontSize)
        var smallH = (420 / 50) * root;
        var smallW = innerWidth;
        var H = smallH;
        var W = smallW;
        var full = false;
        var playVideo = false;
        play.style.display = 'none';
        fullBtn.style.display = 'none';

        const navgigator = window.navigator.userAgent.toLowerCase();

        if (/iphone|ipad/.test(navgigator)) {
            iphone();
        } else {
            Android()
        }
        function Android() {
            liveVideo.style.display = 'none';
            liveCanvas.height = smallH;
            liveCanvas.width = smallW;
            //监听播放
            liveVideo.addEventListener('play', function () {
                bLiveVideoTimer = setInterval(function () {
                    liveCanvas2D.drawImage(liveVideo, 0, 0, W, H);
                }, 60);
                $(fullBtn).show();
                playVideo = true;
            }, false);

            //监听暂停
            liveVideo.addEventListener('pause', function () {
                clearInterval(bLiveVideoTimer);
                liveCanvas.style.transform = null;
                $('.play').show();
                smallVideo(liveCanvas);
                $(fullBtn).hide();
                playVideo = false;
            }, false);
            //监听结束
            liveVideo.addEventListener('ended', function () {
                clearInterval(bLiveVideoTimer);
                smallVideo(liveCanvas);
                playVideo = false;
            }, false);

            // liveVideo.addEventListener('loadedmetadata', function () {
            //     liveVideo.play();
            //     liveVideo.currentTime = 200;
            //     liveVideo.pause();
            // })
            //开始播放
            $(play).mobileClick(function () {
                liveVideo.play();
                $(fullBtn).show();
                $(this).hide();
                playVideo = true;
                newTime.setTime(200)
                var timer = setTimeout(function () {
                    clearTimeout(timer);
                    $(fullBtn).hide();
                }, 3000);
            })
            //播放时点击视频出现全屏按钮
            $(liveCanvas).mobileClick(function () {
                if (playVideo) {
                    $(fullBtn).show();
                    var timer = setTimeout(function () {
                        clearTimeout(timer);
                        $(fullBtn).hide();
                    }, 3000);
                }
            })
            //全屏按钮
            $(fullBtn).mobileClick(function () {
                if (!full) {
                    H = innerWidth;
                    W = innerHeight;
                    liveCanvas.height = H;
                    liveCanvas.width = W;
                    liveCanvas.style.transform = 'rotate(90deg)';
                    liveCanvas.style.top = -750 / 50 + 'rem';
                    this.style.right = 680 / 50 + 'rem';
                    this.style.bottom = -880 / 50 + 'rem';
                    this.style.backgroundImage = 'url(../img/outfull.png)';
                } else {
                    smallVideo(liveCanvas);
                }
                full = !full;
            })
        }

        function iphone() {
            // liveVideo.style.height = smallH + 'px';
            // liveVideo.style.width = smallW + 'px'
            $(liveCanvas).hide();
            //开始播放
            $(play).mobileClick(function () {
                $(fullBtn).show();
                playVideo = true;
                $(this).hide();
                newTime.setTime(200)
                var timer = setTimeout(function () {
                    clearTimeout(timer);
                    $(fullBtn).hide();
                }, 3000);
            })

            //播放时点击视频出现全屏按钮
            $(liveVideo).mobileClick(function () {
                if (playVideo) {
                    $(fullBtn).show();
                    var timer = setTimeout(function () {
                        clearTimeout(timer);
                        $(fullBtn).hide();
                    }, 3000);
                }
            })

            //全屏按钮
            $(fullBtn).mobileClick(function () {
                if (!full) {
                    H = innerWidth;
                    W = innerHeight;
                    liveVideo.style.height = H + 'px';
                    liveVideo.style.width = W + 'px';
                    this.style.right = 650 / 50 + 'rem';
                    this.style.bottom = -750 / 50 + 'rem';
                    this.style.backgroundImage = 'url(../img/outfull.png)';


                    videoBox.style.height = H + 'px';
                    videoBox.style.width = W + 'px';
                    videoBox.style.background = '#000';
                    videoBox.style.transform = 'rotate(90deg)';
                    videoBox.style.top = -750 / 50 + 'rem';
                    $('.content')[0].style.height = innerHeight + 'px';
                    $('.content')[0].style.overflow = 'hidden';
                } else {
                    H = smallH;
                    W = smallW;
                    liveVideo.style.height = smallH + 'px';
                    liveVideo.style.width = smallW + 'px';
                    liveVideo.style.transform = null;
                    liveVideo.style.top = 5 / 50 + 'rem';
                    liveVideo.style.left = 0 / 50 + 'rem';
                    this.style.right = 30 / 50 + 'rem';
                    this.style.bottom = 20 / 50 + 'rem';
                    this.style.backgroundImage = 'url(../img/full.png)';

                    videoBox.style.height = null;
                    videoBox.style.width = null;
                    videoBox.style.background = null;
                    videoBox.style.transform = null;
                    videoBox.style.top = 0;
                    $('.content')[0].style.height = null;
                    $('.content')[0].style.overflow = null;
                }
                full = !full;
            })
        }

        function smallVideo(obj) {
            H = smallH;
            W = smallW;
            obj.height = smallH;
            obj.width = smallW;
            obj.style.transform = null;
            obj.style.top = 0;
            fullBtn.style.right = 30 / 50 + 'rem';
            fullBtn.style.bottom = 20 / 50 + 'rem';
            fullBtn.style.backgroundImage = 'url(../img/full.png)';
        }
    }
})


//计算视频开始时间
function videoStartTime(start) {
    let startTime = new Date(start * 1000);
    let startH = startTime.getHours();
    let startM = startTime.getMinutes();
    let startS = startTime.getSeconds();
    return toTow(startH) + ':' + toTow(startM) + ':' + toTow(startS);
}

//补零函数
function toTow(num) {
    return num < 10 ? '0' + num : num;
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


//秒转时分秒
function StoH(s) {
    var day = Math.floor(s / 60 / 60 / 24);
    var hour = Math.floor(s / 60 / 60 % 24);
    var min = Math.floor(s / 60 % 60);
    var sec = Math.floor(s % 60);
    return {
        day, hour, min, sec
    }
}