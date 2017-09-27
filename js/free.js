$(function(){

    //限时免费公开课接口请求
    ajax('app.php/time_free',function (data) {
        console.log(data);
        if(data.rt === 1){
            const Data = data.data.class_data;
            if(Data){
                Data.map((e) => {
                    let div = document.createElement('div');
                    div.className = 'recon_box';
                    div.class_id = e.id;
                    let str = `
                    <div class="box_fl">
                        <img src="${imgUrl + e.logo}">
                    </div>
                    <div class="box_rt">
                        <p>${e.name}</p>
                        <span>${e.teacher_name}</span>
                        <div class="box_fot">
                            <dd>
                                免费
                            </dd>
                            <dt>1000人报名</dt>
                        </div>
                    </div>
                    `;
                    div.innerHTML = str;
                    $('.recon').html(div);
                })
            }else{
                $('.recon').html(`<p style="text-align:center;font-size:${25/50}rem">暂无数据</p>`);
            }
        }
    },{},'post')
})