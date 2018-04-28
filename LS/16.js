//JS 中的this



//JS中的this的4种应用场景：一般函数中的this，对象方法中的this，构造函数中的this，间接调用中的this。
//不管哪种应用场景下的this，this都指向的都是调用此函数的主体
//一般情况下的this：非严格模式,this指代全局对象；严格模式，this为unfined
function thisTest(){
    console.log(this === window);
}
thisTest();                                                  //true

var a = 10,b = "Hi";
function thisTest2(){
    this.a = 20;
    delete this.b;
    this.c = "新添加属性";
}
thisTest2();
console.log(a,b,c);                                        // 20 "Hi" "新添加属性"

function thisTest() {
    "use strict"
    console.log(this);
}
thisTest();                                                //undefined

function isStrictMode() {
    return this == undefined?true:false;
}
isStrictMode();                                            //false
//对象方法中的this指调用此方法的对象(无嵌套情况下)
var point = {
    x:0,
    y:0,
    moveTo:function (x,y) {
        this.x = x;
        this.y = y;
    }
};
point.moveTo(1,1);
console.log(point);                                      //{x: 1, y: 1, moveTo: ƒ}
//构造函数中的this指通过new新创建的对象
function Point(x,y) {
    this.x = x;
    this.y = y;
}
var p = new Point(2,3);
console.log(p);                                         //{x: 2, y: 3}
Point(5,6);
console.log(window.x,window.y);                         //5 6
//通过apply、call间接调用的函数中的this代指第一个参数
objA = {name:"AA",x:1};
objB = {name:"BB",x:5};
objA.test = function () {
    console.log(this.name,this.x);
};
objA.test();                                             //AA 1
objA.test.call(objB);                                    //BB 5

var bird = {
    name:"polly",
    fly:function(m,n){
        console.log("i'm:"+this.name+" i can fly ___",m,n);
    }
};

var me = {
    name:"QL"
};
bird.fly(5,6);                                          //i'm:polly i can fly ___ 5 6
bird.fly.call(me,7,8);                                  //i'm:QL i can fly ___ 7 8


//JS中this的缺陷(有嵌套的情况下，this不进行作用域传递)
var point = {
    x:0,
    y:0,
    moveTo:function (x,y) {
        function moveToX() {
            this.x = x;
        }
        function moveToY() {
            this.y = y;
        }
        moveToX();
        moveToY();
    }
};
point.moveTo(2,2);
console.log(point);                                     //{x: 0, y: 0, moveTo: ƒ}
console.log(window.x,window.y);                         //2 2
//解决JS中对象方法中嵌套函数中this的指向问题
//解决方案一：使用变量(that或self)软绑定，使this指向正确
var point = {
    x:0,
    y:0,
    moveTo:function (x,y) {
        var that = this;
        function moveToX() {
            that.x = x;
        }
        function moveToY() {
            that.y = y;
        }
        moveToX();
        moveToY();
    }
};
point.moveTo(2,2);
console.log(point);                                     //{x: 2, y: 2, moveTo: ƒ}
console.log(x,y);                                       //报错
//解决方案二：通过call和apply来解决
var point = {
    x:0,y:0,
    moveTo:function (x,y) {
        function moveToX() {
            this.x = x;
        }
        function moveToY() {
            this.y = y;
        }
        moveToX.call(this);//->this.moveToX()->point.MoveToX()
        moveToY();
    }
};
point.moveTo(2,2);console.log(point);                   //{x: 2, y: 0, moveTo: ƒ}
console.log(y);                                         //2
console.log(x);                                         //报错
//解决方案三：通过bind来解决
var point = {
    x:0,y:0,
    moveTo:function (x,y) {
        function moveToX() {
            this.x = x;
        }
        function moveToY() {
            this.y = y;
        }
        moveToX.bind(point)();
        moveToY.bind(point)();
    }
};
point.moveTo(2,2);
console.log(point);                                     //{x: 2, y: 2, moveTo: ƒ}


//构造函数中的this嵌套缺陷
function Point(x,y) {
    this.x = x;
    this.y = y;
    this.moveXY = function (x,y) {
        function moveX(x) {
            this.x+=x;
        }
        function moveY(y) {
            this.y+=y;
        }
        moveX(x);
        moveY(y);
    }
}
var p = new Point(2,3);
p.moveXY(1,1);
console.log(p);                                          // {x: 2, y: 3, moveXY: ƒ}
//解决构造函数中this的嵌套缺陷(方法同对象中的this嵌套缺陷)
function Point(x,y) {
    this.x = x;
    this.y = y;
    this.moveXY = function (x,y) {
        var that = this;//此处that为实例化出来的p对象
        function moveX(x) {
            that.x+=x;
        }
        function moveY(y) {
            that.y+=y;
        }
        moveX(x);
        moveY(y);
    }
}
var p = new Point(2,3);
p.moveXY(1,1);
console.log(p);                                         // {x: 3, y: 4, moveXY: ƒ}

function Point(x,y) {
    this.x = x;
    this.y = y;
    this.moveXY = function (x,y) {
        function moveX(x) {
            this.x+=x;
        }
        function moveY(y) {
            this.y+=y;
        }
        moveX.bind(this,x)();
        moveY.bind(this,y)();
    }
}
var p = new Point(2,3);
p.moveXY(1,1);
console.log(p);                                         //{x: 3, y: 4, moveXY: ƒ}

function Point(x,y) {
    this.x = x;
    this.y = y;
    this.moveXY = function (x,y) {
        function moveX(x) {
            this.x+=x;
        }
        function moveY(y) {
            this.y+=y;
        }
        moveX.call(this,x);
        moveY.call(this,y);
    }
}
var p = new Point(2,3);
p.moveXY(1,1);
console.log(p);                                         //{x: 3, y: 4, moveXY: ƒ}


//思考：下述代码
var obj = {
    name:"obj",
    x:23,
    test:function(){
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
console.log(obj.fun3());                                //ƒ fun2() {return this.x;//若改为 return this;}
console.log(obj.fun3()());                              //undefined
console.log(obj.fun4());                                //23

var obj = {
    name:"obj",
    x:23,
    test:function(){
        console.log(this.x,this);
    }
};
var fun1 = function () {
    return function fun2() {
        return this;
    }
};
obj.fun3 = fun1;
obj.fun4 = fun1();
console.log(obj.fun3());                                //ƒ fun2() {return this.x;//若改为 return this;}
console.log(obj.fun3()());                              //window
console.log(obj.fun4());                                //{name: "obj", x: 23, test: ƒ, fun3: ƒ, fun4: ƒ}