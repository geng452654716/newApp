$(function(){
    var wrapper = document.getElementsByClassName('wrapper')[0];
    let scroll = new BScroll(wrapper, {
        scrollY: true,
        click: true,
    })
    scroll.refresh();
    document.addEventListener('touchstart',function(){
        scroll.refresh();
    })
    
})

let user = '';
if(getCookie('userInfo')!==-1){
    let userInfo = JSON.parse(getCookie('userInfo'));
    user = userInfo.phone;
    user = user.substr(0,3) + '****' + user.substr(7)
}

let imgUrl = 'http://oss.softlinkonline.cn/pcimg/'

function ajax (url,callback=function(){},data={},type='get'){
    $.ajax({
        type,
        dataType:'json',
        data,
        url:'http://ceshi.softlinkonline.cn/'+url,
        success:function(data){
            callback(data)
        }
    })
}

function setCookie(key,value,time){
    if(time){
        var date = new Date;
        date.setDate(date.getDate()+time);
        document.cookie = key + '=' + JSON.stringify(value) + ';expires=' + date;
    }else{
        document.cookie = key + '=' + JSON.stringify(value);
    }
}


function getCookie(key){
    let str = document.cookie;
    let arr = str.split('; ');
    let val = null;
    for(var i=0;i<arr.length;i++){
        let arr2 = arr[i].split('=');
        if(arr2[0] == key){
            val = arr2[1];
            break;
        }
    }
    if(val){
        return val
    }else{
        return -1;
    }
}

function removeCookie(key,value) {
    setCookie(key,value,-1);
}