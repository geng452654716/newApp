$(function(){
    $('#text')[0].focus();
    let name = window.location.hash.substr(1);
    let data = JSON.parse(sessionStorage.getItem('data'));
    $('#text').val(data[name]);
    $('.return').click(() => {
        window.location.href = '../index/userdata.html';
        $('#text')[0].blur();
    })
    $('.en').click(function(){
        data[name] = $('#text').val();
        sessionStorage.setItem('data',JSON.stringify(data));
        window.location.href = '../index/userdata.html';
        $('#text')[0].blur();
    })
})