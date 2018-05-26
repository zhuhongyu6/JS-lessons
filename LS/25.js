//JS事件及事件流


//JS事件响应
//HTML事件响应(JS和HTML耦合性太强): <div id='div1' oncick=function(){} ><div>
//DOM0级事件响应处理
window.onload=function(e){
    var div1=document.getElementById('div1');
    var eventHander=function(e){console.log(e.clientX,e.clientY);};
    div1.onclick=eventHander;
    div1.onclick=null;          //取消事件响应

}
//DOM2级事件处理(addEventListener、removeEventListener:三个参数：处理的事件名(事件名不加on)、处理的事件函数、布尔值(false:冒泡阶段；true：捕获阶段))
window.onload=function(e){
    var div1=document.getElementById('div1');
    var eventHander=function(e){console.log(e.clientX,e.clientY);};
    div1.addEventListener('click',eventHander);
    div1.removeEventListener('click',eventHander);      //取消事件响应
}


//老版本IE事件处理：attachEvent、detachEvent(两个参数，默认为冒泡阶段，处理的事件名要加on)
window.onload=function(e){
    var div1=document.getElementById('div1');
    var eventHander=function(e){console.log(e.clientX,e.clientY);};
    div1.attachEvent('onclick',eventHander);
    div1.detachEvent('onclick',eventHander);      //取消事件响应
}


//解决浏览器事件处理兼容性问题
var eventUtil={
    add:function(ele,type,hander){
        if(ele.addEventListener){
            ele.addEventListener(type,hander,false);
        }else if(ele.attachEvent){
            ele.attachEvent('on'+type,hander);
        }else{
            ele['on'+type]=hander;
        }
    },
    remove:function(ele,type,hander){
        if(ele.removeEventListener){
            ele.removeEventListener(type,hander,false);
        }else if(ele.detachEvent){
            ele.detachEvent('on'+type,hander);
        }else{
            ele['on'+type]=null;
        }
    }
};