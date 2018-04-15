//闭包(闭包是由函数和与其相关的引用环境组合而成的实体，是词法作用域中的函数和其相关变量的包裹体)

//闭包引入案例
function f1(){
	var x=1;
	function f2(){
		return x++;
	}
	return f2();
}
var f3=f1();
console.log(f3);                                    //1
console.log(f3);                                    //1

function f1(){
	var x=1;
	function f2(){
		return x++;
	}
	return f2;
}
var f3=f1();
console.log(f3());                                  //1
console.log(f3());                                  //2

function createInc(startValue){
	return function(step){
		startValue+=step;
		return startValue;
	}
}
var inc = createInc(5);
console.log(inc(1));                               //6
console.log(inc(2));                              //8
inc = createInc(5);
console.log(inc(1));                             //6

function createInc(startValue){
	return function(step){
		startValue+=step;
		return startValue;
	}
}
var inc = createInc(5);
console.log(inc(1));                            //6
console.log(inc(2));                            //8
var inc2 = createInc(5);
console.log(inc(1));                            //9
console.log(inc2(1));                           //6

function foo() {
    var i = 0;
    function bar() {
        console.log(++i);
    }
    return bar();
}
foo();                                          //1
foo();                                          //1

function foo() {
    var i = 0;
    function bar() {
        console.log(++i);
    }
    return bar;
}
var a = foo();
var b = foo();
a();                                           //1
a();                                          //2
b();                                          //1


//闭包的常见形式
//以函数对象形式返回
var tmp = 100;
function foo(x) {
    var tmp = 3;
    return function (y) {
        console.log(x + y + (++tmp));
    }
}
var fee = foo(2); 
fee(10);									//16
fee(10);									//17
fee(10);									//18

var tmp = 100;
function foo(x) {
    //var tmp = 3;
    return function (y) {
        console.log(x + y + (++tmp));
    }
}
var fee = foo(2); 
fee(10);									//113
fee(10);									//114
fee(10);									//115

function f1(m){
	var z = 100;
	function f2(x) {
    	return function (y) {
        	console.log(x + y + (++z));
    	}
	}
	return f2(m);
}
var f3 = f1(2); 
f3(10);										//113
f3(10);										//114

function foo(x) {
    var tmp = 3;
    return function (y) {
        x.count = x.count ? x.count + 1 : 1;
        console.log(x + y + tmp,x.count);
    }
}
var age = new Number(2);
var bar = foo(age); 
bar(10); 									//15 1
bar(10); 									//15 2
bar(10);									//15 3

function fn() {
    var max = 10;//若屏蔽此行，则输出100
    return function bar(x) {
        if(x > max){
            console.log(x);
        }else {
            console.log(max);
        }
    }
}
var f1 = fn();
var max = 100;
f1(15);										//15
//作为对象的方法返回
function counter() {
    var n = 0;
    return {
        count:function () {return ++n;},
        reset:function () {n = 0;return n;}
    }
}
var c = counter();
var d = counter();
console.log(c.count());						//1
console.log(d.count());						//1
console.log(c.reset());						//0
console.log(c.count());						//1
console.log(d.count());						//2



//闭包的作用及常用场景(可通过闭包来访问隐藏在函数作用域内的局部变量；使函数中的变量被保存在内存中不被释放)
function f1(){
    var n = 999;
    function f2(){
        console.log(++n);
    }
    return f2;
}
var f = f1();
f();										//1000
f();										//1001

var n = 10;
function f1(){
    var n=999;
    nAdd=function(){n+=1;};
    function f2(){
        console.log(n);
    }
    return f2;
}
var result=f1();
result(); 									// 999
nAdd();
result();									//1000


//闭包 应用案例 实现数据的封装 私有属性
function Person(){
    var name = "default";
    return {
        getName : function(){
            return name;
        },
        setName : function(newName){
            name = newName;
        }
    }
};
var john = Person();
console.log(john.getName());
john.setName("john");
console.log(john.getName());

var jack = Person();
console.log(jack.getName());
jack.setName("jack");
console.log(jack.getName());

var m = 10;
function f1(){
    nAdd=function(){++m;};
    function f2(){
        console.log(m);
    }
    return f2;
}
var result1=f1();
var result2=f1();
document.onclick = result1; 				// 11
nAdd();
result2();									//11

var m = 10;
function f1(){
    nAdd=function(){++m;};
    function f2(){
        console.log(m);
    }
    return f2;
}
var result1=f1();
var result2=f1();
result1(); 									// 10
nAdd();
result2(); 									// 11
result1();									//11


//闭包应用案例
//遮罩层
function fn() {
    var a;
    return function() {
        return a || (a = document.body.appendChild(document.createElement('div')));
    }
};
var f = fn();
f();
//2秒后执行
function closureExample(objID, text, timedelay) {
    setTimeout(function() {
        //document.getElementById(objID).innerHTML = text;
        console.log(objID,text);
    }, timedelay);
}
closureExample("myDiv","Closure is Create", 2000);
//设置data对象的成员
var db = (function() {
		var data = {};
		return function(key, val) {
			if (val === undefined) { return data[key] } // get
			else { return data[key] = val } // set
		};
	})();
	db('x'); 								//undefined
	db('x', 1); 							// 设置data['x']为1
	db('x'); 								//1

	(function () {
		var m = 0;
		function getM(){
			return m;
		}
		function setM(val){
			m = val;
		}
		window.g = getM;
		window.f = setM;
	}());
	f(100);
	g();									//100


//注意闭包与不经意的变量共享
function f(){
    var result = [];
    for (var i = 0; i < 3; i++) {
        //(function(){
            var pos = i;
            var func = function(){
                return pos;//若是return i;的话最终输出是几？
            }
            result.push(func);
            //console.log(i,pos);
        //}());
    }
    return result;
}
console.log(f()[1]());							//2
	