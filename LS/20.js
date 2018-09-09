//JS内置对象-构造器(正则表达式)

window.onload = function (e) {
    var div1 = document.getElementById("div1");
    var div2 = document.getElementById("div2");

    div1.addEventListener("click",function (e) {
        console.log("div1 click");
    },true);//第3个参数可以不写，默认为false

    div2.addEventListener("click",function (e) {
        console.log("div2 click");
    },true);

    document.addEventListener("click",function (e) {
        console.log("document click");
    },true);

    document.body.addEventListener("click",function (e) {
        console.log("body click");
    },false);
}



