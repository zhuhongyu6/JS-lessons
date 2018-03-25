//字符串常用方法
var str2 = "abcdef".slice(2);               //cdef
var str3 = "abcdef".slice(2,5);             //cde
var str4 = "abcdef".slice(-2);              //ef
var str5 = "abcdef".slice(2,-2);            //cd

var arr6 = "abcdef".split("c");             //["ab", "def"]
var arr7 = "abcdef".split("c",1);           //["ab"]
var arr8 = "abcdef".split("c",2);           // ["ab", "def"]

var str11 = "abcdefabcdef".indexOf("d",1);  //3
var str12 = "abcdefabcdef".indexOf("d",4);  //9

var str13 = "abcdefghijklmn";
var str14 = str13.substr(2,5);              //后一个参数代表长度
console.log(str13,str14);                   //abcdefghijklmn cdefg
var str15 = str13.substring(2,5);           //后一个参数代表第几个end
console.log(str13,str15);                   //abcdefghijklmn cde

//知识回顾 
var a = [1,2,3];
var b = a;
console.log(a,b);                           //[1,2,3] [1,2,3]
b.pop();                            
console.log(a,b);                           //[1,2]  [1,2]
b = [4,5,6];
console.log(a,b);                           //[1,2]   [4,5,6]

function foo(x) {
    x.push(4);
    x = [5,6,7];
    x.push(8);
    console.log(x);                         //[5,6,7,8]
}
var a = [1,2,3];
foo(a);
console.log(a);                             //[1,2,3,4]

function foo(x) {
    x.push(4);
    console.log(x);                         //[1,2,3,4]
    x.length = 0;
    x.push(5,6,7,8);
    console.log(x);                         //[5,6,7,8]
}
var a = [1,2,3];
foo(a);
console.log(a);                             //[5,6,7,8]


//不同类型的表达式
23;                                         //其中的23为原始表达式
obj = {x:2};                                // ={x:2}为对象初始化表达式
arr = [1,2];                                // =[1,2]为数组初始化表达式
var foo = function(){                       // = function(){}为函数定义表达式
    console.log("foo");
};
obj.x;                                      //obj.x为属性访问表达式
foo();                                      //foo()为函数调用表达式
2+3;                                        //2+3为算数运算表达式
2>3;                                        //2>3为关系运算表达式
1&&2;                                       //1&&2为逻辑运算表达式

//条件语句
var a=2,b=3;
if(a>b){
    console.log("a > b");
}else{
    console.log("a < b");
}

//思考
function foo(){
	var a=b=3;
}
foo();
console.log("b:",b);                        //3
console.log("a:",a);                        //报错，a未定义

//循环语句
for(var i = 0;i<5;i++){
    console.log("in for ",i);
}
console.log("out for ",i);


//ES5中没有块作用域
{
    var a = 20;
}
console.log("大括号外依然能访问到a:",a);      //大括号外依然能访问到a: 20        

for(var i = 0;i<5;i++){
    console.log("in for ",i);               //in for 0;in for 1;in for  2;in for  3;in for  4;
}
console.log("out of for ",i);               //out of for  5

if(true){
    var a = 20;
}
console.log(a);                             //20

if(false){
    var b = 30;
}
console.log(b);                             //不报错，undefined


//严格模式使用方法
//全局使用
"use strict"
//函数内部使用
function foo() {
    "use strict"
}
//严格模式下全局变量需显示声明
//非严格模式下不报错
function  sloppyFunc() {
    sloppyVar = 123;
}
sloppyFunc();
console.log(sloppyVar);                     //123
//严格模式下未显示声明全局变量报错
function  sloppyFunc() {
    //'use strict'
    sloppyVar = 123;
}
sloppyFunc();
console.log(sloppyVar);                     //报错
//严格模式下函数中的this为undefined,非严格模式下函数中的this为全局变量
//用this的这一特性检测是否在严格模式的方法
"use strict"
function isStrictMode() {
    return this === window?false:true;
}
//"use stirct" 
console.log(isStrictMode());                //true
//严格模式下禁止删除不可改变的属性和未定义的变量
var str="abc";
function  strictFunc() {
    'use strict';
    str.length = 7;
    console.log(str.length);
}
strictFunc();                               //报错
'use strict';
delete foo;
delete window.foo;                          //报错s
//严格模式下禁止函数参数重名
function f(a, a, b) {
    return a+b;
}
f(2,3,4);                                   //非严格模式下正常执行 7

"use strict";
function f(a, a, b) {
    return a+b;
}
f(2,3,4);                                   //严格模式下报错


//switch语句中的case（case在比较时使用的是全等操作符===比较，因此不会发生隐式类型转换；case后可以是一个表达式）
var i = "1";
switch(i){
    case 1:
        console.log("case 1 Number");
        break;
    default:
        console.log("default");
}                                           //输出default 而不是 case 1 Number

//switch语句中的穿透性及应用
var i = 1;//i=2、3、4
switch(i){
    case 1:
        console.log("case 1");
    case 2:
        console.log("case 2");
        break;
    case 3:
        console.log("case 3");
    //break;
    case 4:
        console.log("case 4");
    default:
        console.log("default");
}                                           //case1 case2


//for ... in 遍历数组
var arr = [2,,"33"];
for(var i in arr){
    console.log(i,arr[i]);                  //0 2;2 33
}

//for ... in 遍历对象
var obj = {x:10,y:20,z:"30"};
for(var k in obj){
    console.log(k,obj[k],typeof obj[k]);
}                                            //x 10 number;y 20 number;z 30 strin


//赋值运算符
var a = 34;
if(a = 45){
    console.log("是否会输出？");              //输出
}

var b = 34;
if(45 == b){                                //为什么要这样写，有什么好处（反写避免把==写成=）
    console.log("是否会输出？");
}

var b = 34;
if(45 = b){                                //报错
    console.log("是否会输出？");
}


//算术运算符
console.log("1"+"2");                   //"12"
console.log("1"+2);                     //"12"
console.log(1+{});                      //"1[object Object]"
console.log(true+true);                //2
console.log("5"-2);                     //3
var x = "1";
console.log(++x);                       //2 
var x = "1";
console.log(x+1);                       //11
// 思考：+= 是转成字符串类型还是转成数字类型
var x = "1";                
console.log(x+=1);                      //11(转换成字符串)
var x = 1;
console.log(x+=1);                      //2
//回顾++i 与 i++
var i=1;
var y = ++i + ++i + ++i;
console.log(y);                         //9


//关系运算符(==与===)
console.log(3===3);                     //true
console.log(3==="3");                   //false
console.log(3=="3");                    //true
console.log(3==new String(3));          //true
console.log(3===new String(3));         //false

var obj1 = new String("xyz");
var obj2 = new String("xyz");
console.log("xyz"===obj1);              //false
console.log(obj1 == obj2);              //false
console.log(obj1 === obj2);             //false
console.log(obj1 == new String("xyz")); //false

var obj1 = new String("xyz");           
var obj2 = new String("xyz");
console.log("xyz"!=obj1);               //false
console.log(obj1 !== obj2);             //true
console.log(obj1 != obj2);              //true
console.log(obj1 != new String("xyz")); //true

console.log(2 == 2);                            //true
console.log(new Number(2) == new Number(2));    //false
console.log(2 == new Number(2));                //true

//存在二义性的代码，与预期的结果不一致
var obj1 = {x:2,y:[1],z:false};
var obj2 = {x:2,y:[1],z:new Boolean(false)};
console.log(obj1.z == obj2.z);                  //true
var obj1 = {x:2,y:[1],z:false};
var obj2 = {x:2,y:[1],z:Boolean(new Boolean(false))};
console.log(obj1.z == obj2.z);                  //false



//&&与||的基本理解与运用(运算符两边都是布尔类型)
console.log(2>1&&4<5);                          //true
console.log(true&&(!2));                        //false
console.log(false&&("2" == 2));                 //false
console.log(false&&false);                      //false

console.log(2>1||4<5);                          //true    
console.log(true||(!2));                        //true
console.log(false||("2" == 2));                 //true
console.log(false||false);                      //false
//逻辑与、或的深层次理解(两侧操作数不是布尔类型时)
console.log(2&&4);                              //4
console.log(0&&4);                              //0
console.log({x:2}&&{name:"Jack"});              //{name:"Jack"}
console.log(null&&"hello");                     //null
console.log({}&&"world");                       //world

console.log(2||4);                              //2
console.log(0||4);                              //4
console.log({x:2}||{name:"Jack"});              //{x:2}
console.log(null||"hello");                     //hello
console.log({}||"world");                       //{}

//思考 所有对象转换为布尔类型 都为 true
console.log((new Boolean(false))&&234);         //234
console.log((new Boolean(false))||234);         //Boolean(false)
//实际运用
var score = 76;
if(score>90){
    console.log("优");
}else if(score>75){
    console.log("良");
}else if(score>60){
    console.log("及格");
}else{
    console.log("不及格");
}
//通过&&和||的组合实现如上功能，注：小括号优先级最高
console.log((score>90&&"优")||(score>75&&"良")||(score>60&&"及格")||"不及格");
//使用||设置函数参数默认值
var sum = function(a,b,c){
    b = b||4;
    c = c||5;
    return a+b+c;
};
console.log(sum(1,2,3));                        //6
console.log(sum(1,2));                          //8
console.log(sum(1));                            //10
console.log(sum(1,0,0));                        //10
//优化改造(避免传参为0的情况与预期结果不符合)
var sum = function(a,b,c){
    if(b!=false){b = b||4;}//(b!=false)&&(b=b||4);
    if(c!=false){c = c||5;}//(c!=false)&&(c=c||5);
    return a+b+c;
};
console.log(sum(1,2,3));                        //6
console.log(sum(1,2));                          //8
console.log(sum(1));                            //10
console.log(sum(1,0,0));                        //1



//函数调用
//函数定义：函数声明方式
function max(a,b){
    return a>b?a:b;
}
max(2,3);
//函数定义：函数表达式方式 （等号右侧可以是匿名函数也可以是非匿名函数）
var max = function (a,b){ //匿名函数
    return a>b?a:b;
};
max(2,3);
//函数定义： Function构造函数方式
var max = new Function("a","b","return a>b?a:b");
max(2,3);



//函数调用
//普通函数直接调用
function test1() {
    console.log("this is",this);
}
test1();                                     //window
//思考嵌套的情况下
function test2() {
    function test3(){
        console.log("this is",this);
    }
    test3();
}
test2();                                    //window
//对象方法调用
var obj = {
    name:"obj",
    x:23,
    test:function(){
        console.log(this.x,this);
    }
};
obj.test();                                 //23
//构造函数
function Person(name){
    this.name = name;
}
Person.prototype.sayHi = function(){
    console.log("Hi,i'm "+this.name);
};
var p1 = new Person("Jack");
p1.sayHi();                                  //Hi,i'm Jack



//参数数量问题
//实参数大于形参数
function test() {
    console.log(arguments);
    console.log(test.arguments==arguments,arguments);
    console.log(Array.prototype.slice.call(arguments));
    var s = "";
    for (var i = 0; i < arguments.length; i++) {
        s += arguments[i];
    }
    return s;
}
test("hello,", "world!");                   //"hello,world!"
//实参数小于形参数
var sum = function(a,b,c){
    b = b||4;
    c = c||5;
    return a+b+c;
};
console.log(sum(1,2,3));                    //6
console.log(sum(1,2));                      //8
console.log(sum(1));                        //10



//值传递
var a = 1;
function foo(x) {
    console.trace("a:",a," x:",x);
    x = 2;//step 2
    console.trace("a:",a," x:",x);//step 3
}

console.trace("a:",a);
foo(a);// step 1
console.trace("a:",a); // step 4 a仍为1

//引用传递
var obj = {x:1};
function fee(o){
    console.trace("obj.x :",obj.x," o.x :",o.x);
    o.x = 3;// step 2
    console.trace("obj.x :",obj.x," o.x :",o.x);// step 3
}

console.trace("obj.x :",obj.x);
fee(obj);// step 1
console.trace("obj.x :",obj.x);//step 4 obj.x被改写为3