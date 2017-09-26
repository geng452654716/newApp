$(function () {

    $('.follow').html(sessionStorage.getItem('followList_length'))
    $('.head_cc p').text(user)

    exchange();


    document.addEventListener('touchstart',function () {
        $('.tex').blur();
    },false)


    //兑换按钮事件
    $('.code_btn')[0].addEventListener('touchstart',function () {
        var code = $('.tex').val();
        if(code){
            ajax('app.php/code_add',function (data) {
                if(data.rt === 1){
                    $('.message').html('兑换成功');
                    $('.conten').html('');
                    exchange();
                    $('.tex').val('');
                }else{
                    $('.message').html('验证码失效')
                }
                setTimeout(function() {
                    $('.message').html('')
                }, 2000);
            },{code},'post')
        }
    })



    //兑换列表请求
    function exchange (){
        ajax('app.php/code_list', function (data) {
            if(data.rt === 1){
                const Data = data.data;
                if(Data){
                    if(Data.length === 0){
                        $('.conten').html(`<p style="text-align:center;font-size:${25/50}rem">暂无数据</p>`)
                    }
                    Data.forEach((e) => {
                        let div = document.createElement('div');
                        div.className = 'din_con';
                        let str = `
                        <div class="dinc_fl">
                            <img src="${imgUrl + e.weblogo}" />
                        </div>
                        <div class="dinc_rt">
                            <p>${e.name}</p>
                            <span>${e.teachername}</span>
                            <div class="dincc">
                                <div class="price">¥${e.price}</div>
                                <div class="study">立即学习</div>
                            </div>
                        </div>
                        `
                        div.innerHTML = str;
                        $('.conten').append(div);
                    })
                }else{
                    $('.conten').html(`<p style="text-align:center;font-size:${25/50}rem">暂无数据</p>`)
                }
            }
        }, {}, 'post')
    }
})

