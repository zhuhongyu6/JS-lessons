//undefined的几种情况
var a;
console.log(a);         //undefined
function foo(x,y) {
    console.log(x,y);   
}
foo(1);                 //1 undefined
function fee() {};
var fun = fee();
console.log(fun);       //undefined


//注意：console.log(typeof null)   //object


//包装对象：基本数据类型只是临时包装，临时对象在使用后立即释放

var a=123;
var b=new Number(a);
console.log(a==b);              //true
console.log(a===b);             //false

var str = "abcde";
console.log(str.length);        //5 
str.length = 1;
console.log(str.length,str);    //5  "abcde"(临时包装)

var arr = [1,2,3,4];
console.log(arr.length);        //4
arr.length = 1;
console.log(arr.length,arr);    //1 [1]（引用类型不是临时包装，原始值可变）


//类型转换
//转换成Boolean
console.log(Boolean(undefined));    //false
console.log(Boolean(null));         //false
console.log(Boolean(0));            //false
console.log(Boolean(NaN));         //false
console.log(Boolean(1));           //true
console.log(Boolean(""));          //false
console.log(Boolean("abc"));       //true
console.log(Boolean({}));          // true
if(new Boolean(false)){
    console.log("执行");
}                                  //执行
//转换成Number
console.log(Number(undefined));         //NaN
console.log(Number(null));              //0
console.log(Number(true));              //1
console.log(Number(false));             //0
console.log(Number(""));                //0
console.log(Number("abc"));             //NaN
console.log(Number("123.345xx"));       //NaN
console.log(Number("32343,345xx"));     //NaN
console.log(Number({x:1,y:2}));         //NaN
console.log(parseFloat("123.345xx"));   //123.345
console.log(parseFloat("32343,345xx")); //32343
console.log(parseInt("123.345xx"));     //123
console.log(parseInt("32343,345xx"));   //32343
//转换成String
console.log(String(undefined));         //undefined
console.log(String(null));              //null
console.log(String(true));              //true
console.log(String(false));             //false
console.log(String(0));                 //0
console.log(String(234));               //234
console.log(String({x:1,y:2}));         //[object object]


//隐式类型转换
//比较运算符
var a = 3;
var b = 4;
console.log(typeof (a>b),a>b);          //Boolean false
console.log(typeof (a==b),a==b);        //Boolean false
console.log(typeof (a<b),a<b);          //Boolean true
//算术运算符
var c = "img" + 3 +".jpg";
var d = "23" - 5;
console.log(c,d);                       //img3.jpg   18
console.log(typeof (c));                //string
console.log(typeof (d));                //number
//逻辑运算符
var e = !23;                            
var f = !!34;                           
var g = !!{};                           
console.log(e,f,g);                     //false true true
console.log(typeof (e));                //Bollean
console.log(typeof (f));                //Bollean             
console.log(typeof (g));                //Bollean
//流程语句
var h = {x:1};
if(h){
    console.log("h:",h);
}                                       //h {x:1}