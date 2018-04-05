//JS作用域及执行上下文


var a=10,
	b=20;
function fn(){
	var a=100,
		c=200;
	function bar(){
		var a=500,
			d=600;
		console.log(a,b,c,d);
	}
	bar();
}
fn();                                                                  //500 20 200 600


//词法作用域(与调用形式无关)
var name = "Jack";
function echo() {
    console.log(name);
}
echo();                                                             //Jack

var name = "Jack";
function echo() {
    console.log(name);
}
function foo() {
    var name = "Bill";
    echo();
}
foo();                                                           //Jack

var name = "Jack";
function echo() {  
    console.log(name);
}
function foo() {
    var name = "Bill";
    function fee(){
        var name = "Lucy";
        echo();
    }
    fee();
}
foo();                                                        //Jack

var scope = "g";
function foo(){
	var scope = "l";
	return new Function("console.log(scope);")
}
foo()();                                                    //g

//ES5中无块作用域
{
    var a = 4;
}
console.log(a);


//使用IIFE来解决变量污染问题
var userId = 123;
document.onclick = function () {
    console.log("userId = ",userId);
};
//多人协同开发时问题，块作用域缺陷的问题可能会更加明显
(function(){
    var a=2,b=3;
    if(a<b){
        var userId = 234;
    }
}());
