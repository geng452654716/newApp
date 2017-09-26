$(function() {

    //昵称
    $('.user .name').text(user);

    //关注数量
    $('.user .follow').text(sessionStorage.getItem('followList_length'));
    //点击事件
    $(document).on("click",".tab li",function(){
		$(".tab li a").removeClass("blue")
		$(this).find("a").addClass("blue")
        var subscript=$(this).index();
		$(".option li").hide()
		$(".option li").eq(subscript).show()
	})
    
    //直播数据
    ajax('app.php/collection',function(data){
        if(data.rt === 1){
            const Data = data.data.collection_courses;
            if(!Data.length){
                $('.details').html(`<p style="text-align:center;font-size:${30/50}rem;padding-top:${50/50}rem">暂无数据</p>`);
            }
            Data.map((e) => {
                let div = document.createElement('div');
                div.className = 'zhi_son'
                let str = `
                <div class="zhi_tu">
                    <img src="${imgUrl + e.weblogo}">
                    <span>回放</span>
                </div>
                <div class="gao_tit">
                    ${e.name}
                </div>
                <div class="gao_p">
                    08-23 19:00
                </div>
                <div class="gao_xin">
                    <span>套课：5课时</span>
                    <p>
                        <a class="small">¥</a>6-
                        <a class="small">¥</a>128</p>
                </div>
                <div class="gao_guan">
                    1000+人关注
                </div>
                `
                div.innerHTML = str;
                $('.details').append(div);
            })
        }
    },{type:2})
    
    //直播点击切换数据
    $('.zhi')[0].addEventListener('touchstart',function(){
        ajax('app.php/collection',function(data){
            if(data.rt === 1){
                const Data = data.data.collection_courses;
                if(!Data.length){
                    $('.details').html(`<p style="text-align:center;font-size:${30/50}rem;padding-top:${50/50}rem">暂无数据</p>`);
                }else{
                    $('.details').html('');
                }
                Data.map((e) => {
                    let div = document.createElement('div');
                    div.className = 'zhi_son'
                    div.class_id = e.id;
                    let str = `
                    <div class="zhi_tu">
                        <img src="${imgUrl + e.weblogo}">
                        <span>回放</span>
                    </div>
                    <div class="gao_tit">
                        ${e.name}
                    </div>
                    <div class="gao_p">
                        08-23 19:00
                    </div>
                    <div class="gao_xin">
                        <span>套课：5课时</span>
                        <p>
                            <a class="small">¥</a>6-
                            <a class="small">¥</a>128</p>
                    </div>
                    <div class="gao_guan">
                        1000+人关注
                    </div>
                    `
                    div.innerHTML = str;
                    $('.details').append(div);
                })
            }
        },{type:2}) 
    })


    //推荐点击切换数据
    $('.tui')[0].addEventListener('touchstart',function(){
        ajax('app.php/collection',function(data){
            if(data.rt === 1){
                const Data = data.data.collection_courses;
                if(!Data.length){
                    $('.recon').html(`<p style="text-align:center;font-size:${30/50}rem;padding-top:${50/50}rem">暂无数据</p>`);
                }else{
                    $('.recon').html('');
                }
                Data.map((e) => {
                    let div = document.createElement('div');
                    div.className = 'recon_box';
                    div.class_id = e.id;
                    let str = `
                    <div class="box_fl">
                        <img src="${imgUrl + e.weblogo}">
                    </div>
                    <div class="box_rt">
                        <p>${e.name}</p>
                        <span>讲师名</span>
                        <div class="box_fot">
                            <dd>
                                <a class="small">¥</a>6</dd>
                            <dt>1000人浏览</dt>
                        </div>
                    </div>
                    `
                    div.innerHTML = str;
                    $('.recon').append(div);
                })
            }
        },{type:1})
    })
})