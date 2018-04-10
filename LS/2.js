//函数及函数参数

//函数的定义
//通过函数声明的形式来定义
function max(a,b){
    return a>b?a:b;
}
max(2,3);
//通过函数表达式的形式来定义(函数右边可以是匿名函数，也可以是非匿名函数)
var max = function (a,b){ //匿名函数
    return a>b?a:b;
};
max(2,3);
//通过Function构造函数实例化的形式来定义
var max = new Function("a","b","return a>b?a:b");
max(2,3);



//函数的调用
//作为函数直接调用(严格模式下函数中的this为undefined，非严格模式下函数中的this为全局对象)
function test1() {
    console.log("this is",this);                        //this is window
}
test1();                                    
//思考嵌套的情况下
function test2() {
    function test3(){
        console.log("this is",this);
    }
    test3();
}
test2();                                            //this is window
//作为对象方法调用
var obj = {
    name:"obj",
    x:23,
    test:function(){
        console.log(this.x,this);
    }
};
obj.test();                                         //23

var x = 45;
var test = function(){
	console.log("输出：",this.x);
}
var obj = {
    x:23
};
obj.test = test;
obj.test();                                     //23
test();                                         //45

var x = 45;
var obj = {
    x:23,
    test:function(){
		function foo(){
			console.log(this.x);
		}
		foo();
    }
};
obj.test();                                     //45
//给obj动态添加方法
var sayHi = function () {
    console.log("Hi，i'm",this.name);
};
obj.sayHi = sayHi;//添加给对象添加方法
obj.sayHi();                                    //Hi，i'm
//通过call()和apply()间接调用
objA = {name:"AA"};
objB = {name:"BB"};
objA.foo = function(){
    console.log(this.name);
};
objA.foo();                                     //AA
objA.foo.call(objB);                            //BB

function test() {
    console.log(Array.prototype.slice.call(arguments));
}
test(1,2,3,"4",5);                              //[1,2,3,"4",5]
//作为构造函数调用(this指向实例化出来的对象)
function Person(name){
    this.name = name;
}
Person.prototype.sayHi = function(){
    console.log("Hi,i'm "+this.name);
};
var p1 = new Person("Jack");
p1.sayHi();                                     //Hi,i'm Jack



//实参数大于形参数(通过函数对象属性arguments获得所有实参、类数组对象)
function test(){
	console.log(arguments);
	console.log(test.arguments==arguments,arguments);
	console.log(Array.prototype.slice.call(arguments));
	var s="";
	for(var i=0;i<arguments.length;i++){
		s+=arguments[i];
	}
	return s;
}
test("hello,","world!");                        //"hello,world!"
//实参数小于形参数(少的参数值为undefined、可使用||给出默认值)
var sum = function(a,b,c){
    b = b||4;
    c = c||5;
    return a+b+c;
};
console.log(sum(1,2,3));                        //6
console.log(sum(1,2));                          //8
console.log(sum(1));                            //10




//值传递(实参为基本数据类型时，形参改变不影响实参)
var a=1;
function foo(x){
	x=2;
	console.log("a:",a,"x:",x)
}
foo(a);                                       //a:1  x:2
console.log(a);                               //1
//引用传递(实参为引用类型时，形参改变影响实参)
var obj={x:1};
function fee(o){
	o.x=3;
	console.log(obj.x,o.x);
}
fee(obj);                                   //3 3
console.log("obj.x:",obj.x);                //obj.x:3




//函数对象(JS中的函数也是对象，即函数对象)
function foo(){}
console.log(foo);                           //f foo(){}
console.log(typeof foo);                    //function
console.log(foo instanceof Object);         //true
console.log(foo instanceof Function);       //true
console.log(foo === window.foo);            //true
console.log(typeof Function);               //function
console.log(typeof Array);	                //function
console.log(typeof Date);	                //function
console.log(typeof Error); 	                //function
console.log(typeof Math);	                //object
console.log(typeof JSON);                   //object
console.log(typeof new Function());         // function
console.log(typeof new Array());	        //object
console.log(typeof new Date());	            //object
console.log(Function instanceof Function);  //true
console.log(Function instanceof Object);    //true
console.log(Array instanceof Function);     //true
console.log(Array instanceof Object);       //true
console.log(Date instanceof Function);      //true
console.log(Date instanceof Object);        //true
console.log(Math instanceof Function);      //false
console.log(Math instanceof Object);        //false
console.log(JSON instanceof Function);      //false
console.log(JSON instanceof Object);        //true



//函数对象的arguments属性(表示实参的集合，以数组的形式)
var foo=function (a,b){
	console.log(arguments);
	//console.log(arguments===test.arguments);
	console.log(arguments.length);
	var args=Array.prototype.splice.call(arguments,0);
	console.log(args);
}
foo(1,2,3,4);
//函数对象属性的length属性(表示形参个数) 
function checkVarCount(a, b) {
    if (checkVarCount.length !== arguments.length) {
        alert("The count of the parameters you passed into the function doesn't match the function definition.");
    }else{
        alert("Successfully call the function");
    }

}
checkVarCount(1, 2);                    //Successfully call the function
checkVarCount(1);                       //The count of the parameters you passed into the function doesn't match the function definition.
//函数对象属性之caller 获取调用当前函数的函数。
function test() {
    if (test.caller == null) {
        console.log("test is called from the toppest level");
    } else {
        console.log("test is called from the function:");
        console.log(test.caller.toString());
    }
}
console.log("没有调用的情况下test.caller为：",test.caller);           //没有调用的情况下test.caller为： null
test();                                                             //test is called from the toppest level
function testOuter() {
    test();
}
testOuter();                                                        //test is called from the function:
                                                                    //function testOuter() {
                                                                    //  test();
                                                                    // }
var obj = {
    foo1:function(){
    console.log(this.foo1.caller);
    },
    foo2:function abc(){
        this.foo1();
     }
 };
obj.foo1();                                                         //null
obj.foo2();                                                         //f abc(){this.foo1();}
//函数对象属性之callee(返回正被执行的 Function 对象,callee 属性是 arguments 对象的一个成员,常用于实现递归调用)
var func = function(n){
    if (n <= 0)
        return 1;
    else
        //return n * func(n - 1);
        return n * arguments.callee(n - 1);                         
};
console.log(func(4));                                               //24 

(function(n){
    if (n <= 0)
        return 1;
    else
        return n * arguments.callee(n - 1);
}(4));                                                              //24     
//函数对象的prototype属性
function Man(name, age) {
    this.name = name;
    this.age = age;
}
Man.prototype.sex = "M";
Man.prototype.sayHi = function () {
    console.log("Hi,i'm",this.name);
};
var li = new Man("Leo", 10);
li.sayHi();                                                         //Hi,i'm Leo
console.log(li.sex);                                                //M

Man.prototype.isStrong = true;
console.log(li.isStrong);                                           //true




//函数的call方法
function swim(m,n){
    console.log("i'm:"+this.name+" i can swim ___",m,n);
}
var bird = {
    name:"polly",
    fly:function(m,n){
        console.log("i'm:"+this.name+" i can fly ___",m,n);
    }
};

var me = {
    name:"ABC"
};
swim(1,2);                                                          //i'm: i can swim ___ 1 2                                                                              
swim.call(me,3,4);                                                  //i'm:ABC i can swim ___ 3 4
bird.fly(5,6);                                                      //i'm:polly i can fly ___ 5 6
bird.fly.call(me,7,8);                                              //i'm:ABC i can fly ___ 7 8
bird.fly.apply(me,[7,8]);                                           //i'm:ABC i can fly ___ 7 8
swim.call(null,1,2);                                                //i'm: i can swim ___ 1 2
//函数对象的apply方法
swim.apply(me,[9,10]);                                              //i'm:ABC i can swim ___ 9 10
bird.fly.apply(me,[11,12]);                                         //i'm:ABC i can fly ___ 11 12
swim.apply(null,[13,14]);                                           //i'm: i can swim ___ 13 14
//函数对象的bind方法
var x = 45;
var obj = {
    x:23,
    test:function(){
		function foo(){
			console.log(this.x);
		}
		foo.bind(this)();
		foo();
    }
};
obj.test();                                                     //23  45

var checkNumericRange = function (value) {
    if (typeof value !== 'number')
        return false;
    else
        return value >= this.minimum && value <= this.maximum;
};

// The range object will become the this value in the callback function.
var range = { minimum: 10, maximum: 20 };

// Bind the checkNumericRange function.
var boundCheckNumericRange = checkNumericRange.bind(range);

// Use the new function to check whether 12 is in the numeric range.
var result = boundCheckNumericRange (12);                   //相当于range.boundCheckNumericRange (12)
console.log(result);                                        //true
//函数对象的toString与valueOf方法
var foo = function () {
    console.log("foo");
};
console.log(foo.toString()," ___ ",typeof foo.toString());
console.log(foo.valueOf()," ___ ",typeof foo.valueOf());
console.log(foo.hasOwnProperty("toString"));                //false
console.log(Object.prototype.hasOwnProperty("toString"));   //true
console.log(foo.hasOwnProperty("valueOf"));                 //false
console.log(Object.prototype.hasOwnProperty("valueOf"));    //true


//高阶函数
function add(x, y, f) {
    return f(x) + f(y);
}
add(2,3,function(z){return z*z;});
add(2,-3,Math.abs);
add(2,3,Math.sqrt);


//练习使用高阶函数实现下述公式，要求函数复用
//z = 2*(x+1)-3*y*y;
//c = 2*a*a-3*(b-1);
//k = 2*(i+1)-3(j-1);
function foo(x,y,c1,c2){
	return 2*c1(x)-3*c2(y);
}
function f1(x){
	return x+1;
}
function f2(x){
	return x-1;
}
function f3(x){
	return x*x;
}
foo(1,1,f1,f3);//1
foo(1,1,f3,f2);//2
foo(1,1,f1,f2);//4
//排序
var arr = [10, 20, 1, 2];
arr.sort(function (x, y) {
    if (x < y) {
        return -1;
    }
    if (x > y) {
        return 1;
    }
    return 0;
});                                                 // [1, 2, 10, 20]

var arr = [1, 2, 4, 5, 6, 9, 10, 15];
var r = arr.filter(function (x) {
    return x % 2 !== 0;
});
r;                                              // [1, 5, 9, 15]
//函数作为返回值
var x=12;
var obj = {
    x:34,
    fun2:function(){
        console.log(this.x,this);
    }
};
var fun1 = function () {
    return function fun2() {
        return this.x;
    }
};
obj.fun3 = fun1;
obj.fun4 = fun1();
console.log("输出：",obj.fun3());               // ƒ fun2() {return this.x;}
console.log("输出：",obj.fun3()());            //12
console.log("输出：",obj.fun4());              //34