$(function () {
    let initData = {
        name:'昵称&&昵称',
        school:'北京大学',
        major:'金融工程',
        email:'1234qwer@163.com'
    }
    $('.edit').click(function () {
        let className = $(this).attr('class').split(' ')[1];
        window.location.href = '../index/userdata_edit.html#'+className;
        sessionStorage.setItem('data',JSON.stringify(initData));
    })
    if(sessionStorage.getItem('data')){
        initData = Object.assign({},JSON.parse(sessionStorage.getItem('data')))
    };
    init(initData);
    function init(init){
        $('.name').find('.cont').html(init.name);
        $('.school').find('.cont').html(init.school);
        $('.major').find('.cont').html(init.major);
        $('.email').find('.cont').html(init.email);
    }
})