$(function(){
    let teacherList = $('.teacherList')[0];
    var lis = teacherList.getElementsByTagName('li');
    let startX = null;
    let next = null;
    for(let i = 0;i<lis.length;i++){
        lis[i].left = 0;
        lis[i].addEventListener('touchstart',function(e){
            startX = e.changedTouches[0].clientX;
            if(this.left == 0 && next){
                next.style.transition = 'all .5s';
                next.style.transform  = `translateX(${0}rem)`;
                next.left = 0;
            }
            this.style.transition = null;
            next = this;
        })
        // lis[i].addEventListener('touchmove',function(e){
        //     let endX = e.changedTouches[0].clientX;
        //     if(startX - endX > 50){
        //         if(this.left <= -127){
        //             this.left = -127;
        //         }
        //         this.style.transform  = `translateX(${(this.left-=4) /50}rem)`;
        //     }
        //     if(endX - startX < 50){
        //         if(this.left >= 0){
        //             this.left = 0;
        //         }
        //         this.style.transform  = `translateX(${(this.left+=4) / 50 }rem)`;
        //     }
        // })
        lis[i].addEventListener('touchend',function(e){
            next == null;
            let endX = e.changedTouches[0].clientX;
            if(startX - endX > 150){
                this.left = -127;
                this.style.transition = 'all .5s';
                this.style.transform  = `translateX(${-130 / 50}rem)`;
            }
            if(endX - startX > 150 ){
                this.left = 0;
                this.style.transition = 'all .5s';
                this.style.transform  = `translateX(${0}rem)`;
            }
        })
    }
})