//js中的立即执行表达式LLFE



//立即执行表达式常见形式(IIFE是表达式，结尾要使用分号，否则可能报错)
(function max(x,y){
	console.log("the max is",x>y?x:y);
}(2,3))                                                         //the max is 3                 

(function (x,y){//可以没有函数名
	console.log("this min is",x<y?x:y);
})(2,3);                                                      //this min is 2

(function(){
	console.log("111");
})();//分号不能省，否则会报错                                  //111
(function(){
	console.log("222");
})()                                                        //222
// 其他形式的IIFE 与运算符结合的写法
var i = function(){
    return 10;
}();
console.log(i);                                             //10

true&&function(a,b){
	return a>b?a:b;
}(5,9);                                                    //9

!function(x,y){
	return x==y?true:false;
}("5",5);                                                   //false

!function(x,y){
	return x===y?true:false;
}("5",5);                                                   //true




//使用IIFE函数立即执行表达式避免文件之间的全局污染 
//(function () {  // IIFE开始
var x = 10;
document.onclick = function () {
	// console.log("x = ",x);
	alert("x = "+x);
};
//})(); 
//IIFE 解决变量共享问题
function f(){
	var getNumFuncs=[];
	for(var i=0;i<10;i++){
		(function(j){
			getNumFuncs[j]=function(){return j;}
			})(i);
	}
	return getNumFuncs;
}
var tmp=f();
tmp[3]();												//3

function f(){
    var getNumFuncs = [];//函数数组
    var j;
    for(var i=0;i<10;i++){
        j = i;
        getNumFuncs[i] = function(){
            return j;
        };
    }
    return getNumFuncs;
}
var tmp = f();
tmp[3]();												//9

function f(){
    var getNumFuncs = [];//函数数组
    var j;
    for(var i=0;i<10;i++){
        j = i;
        getNumFuncs[i] = function(){
            return i;
        };
    }
    return getNumFuncs;//设置断点，查看变量共享问题
}
var tmp = f();
tmp[3]();												//10



//IFFE解决实际问题
var tabs = document.getElementsByClassName('tabs')[0].children;
var contents = document.getElementsByClassName('show')[0];

for(var i=0;i<tabs.length;i++) {
    (function (i) { 	//IIFE start
        tabs[i].onclick=function(){
            for (var j = 0; j < tabs.length; j++) {
                tabs[j].className = '';
            }
            this.className = "active";
            contents.innerHTML = "导航" + i + "内容";
        };
    }(i));			//IIFE end
}


for (var i = 0; i < 5; i++) {
    (function(j) {  // j = i
        setTimeout(function() {
            console.log(new Date, j);
        }, 1000*i);
    })(i);
}