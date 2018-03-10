
//JS（ES5）数据类型（6种2类）
//基本（原始）类型：Number、String、Boolean、Null、Undefine
//引用（对象）类型：Object（Array、Function、Date、Error）

//类型检测：
//typeof（一般用于值类型检测）
console.log(typeof 123);    		//number
console.log(typeof true);           //boolean
console.log(typeof "abc");  		//string
console.log(typeof undefined);  	//undefined
console.log(typeof {name:"Bob",age:"20"});  //object
console.log(typeof function foo(){});  //function
console.log(typeof null);   		//注意：object

//instanceof（左操作数为对象，右操作数为类型）
var a = {name:"Mike",age:20};
console.log(a instanceof Object);	//true
var b = [12,34,{},""];
console.log(b instanceof Array);	//true
console.log(b instanceof Object);   //true
var Person = function(){
    //...
};
var p1 = new Person();
console.log(p1 instanceof Person);	//true
console.log(p1 instanceof Object);	//true

//基本类型与引用类型区别：内存分配方式不同、赋值时不同、判等时不同、函数参数传递时不同
//注意：真正决定这几种不同的是数据类型，而不是内存分配方式，内存分配方式决定的是变量的生命周期

//赋值
//原始类型是直接访问值，是值赋值
var a= "a";
var b = a;
b = "b"; 
console.log(a,b);       //a b

//引用类型是引用赋值
var a= {v:"a"}; 
var b = a;
b.v = "b"; 
console.log(a,b);   //b b
b={v:"c"};   	    //重新创建了对象
console.log(a,b);   //b c



//判等
//值类型是判断变量的值是否相等(值比较)
// 引用类型是判断所指向的内存空间是否相同（引用比较）
var c = {x1:2,y1:3};
var d = {x2:2,y2:3};
console.log(c.x1 === d.x2);	//true
console.log(c === d);		//false
console.log({m:1}==={m:1});	//false

var a1 = 100;
var b1 = 100;
console.log(a1 == b1);	    //true
console.log(a1 === b1);     //true

var a2 = new Number(200);
var b2 = new Number(200);
console.log(a2 == b2);		//false
console.log(a2 === b2);		//false

var a3 = new Number(200);
var b3 = a3;
console.log(a3 == b3); 		//true
console.log(a3 === b3);		//true
b3 = new Number(200);
console.log(a3 === b3);		//false

var a4 = new Number(200);
var b4 = 200;
console.log(a4 == b4);		//true
console.log(a4 === b4);     //false

var a5 = {x:1,y:2};
var b5 = {x:1,y:2};
console.log(a5 === b5);		//false
console.log(a5.x === a5.x);	//true


//参数传递方式
//值传递
var a = "Hello World";
function fn(arg){
console.log(arg);
	// Hello World   
arg = "Hai";   
console.log(a,arg);	    //Hello World , Hai
};
fn(a);		
console.log(a);         //Hello World

//引用传递
var a = {value:1};
function fn1(arg){   
arg.value=3;
};
fn1(a);
console.log(a);		// 3
function fn2(arg){   
arg={value:2};
}
fn2(a);
console.log(a);		//3



//经典案例
var a =123;
function foo1(x){	
x = 345;
}
foo1(a);
console.log(a);     // 123

var a ={y:123};
function foo2(x){	
x.y = 345;
}
foo2(a);
console.log(a.y);   //345

var a ={y:123};
function foo3(x){
x.y = 345;
x = {y:456};
}
foo3(a);
console.log(a.y);   //345

var a ={y:123};
function foo4(x){ 
x = {y:456};	   
x.y = 345;	
}
foo4(a);
console.log(a.y);	//123

