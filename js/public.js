$(function(){
    var wrapper = document.getElementsByClassName('wrapper')[0];
    let scroll = new BScroll(wrapper, {
        scrollY: true,
        click: true,
    })
    scroll.refresh();
    document.addEventListener('click',function(){
        scroll.refresh();
    })
})