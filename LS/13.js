//JS对象综述



//JS对象
var obj = {
    num:10,
    str:"Hi",
    show:function(){
        console.log(this.str);
    }
};
console.log(obj.num);                               //10
console.log(obj.str);                               //Hi
obj.show();			                                //Hi


//JS对象分类(内置对象、宿主对像(document、window)、自定义对象)
//内置对象：分为构造器函数对象和非构造器对象(Math、JSON、arguments、全局对象)
console.log(typeof Array);                          //function
console.log(typeof Function);                       //function
console.log(typeof Date);                           //function
console.log(typeof Number);                         //function
console.log(typeof String);                         //function
console.log(typeof Boolean);                        //function
console.log(typeof Math);                           //object
console.log(typeof JSON);                           //object

console.log(Object instanceof Function);            //true
console.log(Object instanceof Object);              //true
console.log(Boolean instanceof Object);             //true
console.log(String instanceof Function);            //true  
console.log(String instanceof Object);              //true
console.log(Number instanceof Function);            //true
console.log(Number instanceof Object);              //true
console.log(Function instanceof Function);          //true
console.log(Function instanceof Object);            //true
console.log(Array instanceof Function);             //true
console.log(Array instanceof Object);               //true
console.log(Date instanceof Function);              //true
console.log(Date instanceof Object);                //true
console.log(Math instanceof Function);              //false
console.log(Math instanceof Object);                //true
console.log(JSON instanceof Function);              //false
console.log(JSON instanceof Object);                //true


//JS对象属性分类(数据属性、访问器属性(访问和设置时不加括号)、内置属性)
var o={
	_x:1.0,
	get x(){return this._x;},
	set x(val){this._x=val;}
};
console.log(o.x);                                   //1
o.x=2;
console.log(o.x,o._x);                              //2 2

var o = {
    _x:1.0,
    get x(){
        return this._x;
    }
};
console.log(o.x);                                   //1
o.x = 2;
console.log(o.x,o._x);                              //1 1
//访问器属性实现数据验证
var p1 = {
    _name:"Jack",
    _age:23,
    set age(val){
        if(val>0&&val<150){
            this._age = val;
        }else{
            console.log("请设置正常年龄");
        }
    },
    get age(){
        return this._age;
    }
};
p1.age = 178;
console.log(p1.age);                                //请设置正常年龄 23

var p={
	x:1,
	y:1,
	get r(){return Math.sqrt(this.x*this.x+this.y*this.y);},
	set r(newValue){
		var oldValue=Math.sqrt(this.x*this.x+this.y*this.y);
		var ratio=newValue/oldValue; 
		this.x*=ratio;
		this.y*=ratio;
	},
	get theta(){return Math.atan2(this.y,this.x);}
};
var q=Object.create(p);
q.x=2;
q.y=2;
console.log(q.r);                                   //2.8284271247461903
console.log(q.theta);                               //0.7853981633974483



//JS对象创建方式(3种)
//通过对象自变量的方式创建对象
var obj = {
    num:10,
    str:"Hi",
    show:function(){
        return this.str;
    }
};
console.log(obj.num);                               //10
console.log(obj.str);                               //Hi
console.log(obj.show());                            //Hi
console.log(obj.__proto__);
console.log(obj.__proto__ === Object.prototype);    //true
//通过Object的create静态方法创建对象(JS对象通过原型链的方式实现对象继承)
var newObj = Object.create(obj);//newObj的原型是obj
newObj.age = 23;
console.log(newObj.num);                            //10
console.log(newObj.str);                            //Hi
console.log(newObj.show());                         //Hi
console.log(newObj.age);//自有属性                   //23
console.log(newObj.__proto__);                      //{num:10,str:'Hi',show:f}
console.log(newObj.__proto__ === obj);              //true
/*
o = {};
// 以字面量方式创建的空对象就相当于:
o = Object.create(Object.prototype);
o = Object.create(Object.prototype, {
    // foo会成为所创建对象的数据属性
    foo: {
        writable:true,
        configurable:true,
        value: "hello"
    },
    // bar会成为所创建对象的访问器属性
    bar: {
        configurable: false,
        get: function() { return 10 },
        set: function(value) {
            console.log("Setting `o.bar` to", value);
        }
    }
});
*/
//通过构造函数的方式创建对象
function Person(name,age){
	this.name=name;
	this.age=age;
}
Person.prototype.sayName=function(){
	console.log("hello,i'm",this.name,this.age,"years old");
};
var person1=new Person('Mike',21);
person1.sayName();                                      //hello,i'm Mike 21 years old
//注意：
var objStr = new Object("xxx");
console.log(typeof objStr);                             //object
console.log(objStr instanceof String);                  //true

var objNum = new Object(23);
console.log(typeof objNum);                             //object
console.log(objNum instanceof Number);                  //true

var objBoolean = new Object(true);
console.log(typeof objBoolean);                         //object
console.log(objBoolean instanceof Boolean);             //true



//对象属性的增删改查
var obj = {};
obj.x = 2;//直接添加属性
console.log(obj.x);//通过.访问属性                        //2
obj.x = 5;//设置属性
console.log(obj["x"]);//通过[]访问属性                    //5
delete obj.x;//删除属性
console.log(obj.x);                                     //undefined

//访问属性的for循环练习
var obj2 = {
    id_1:2,
    id_2:4,
    id_3:6,
    id_4:8,
    id_5:10
};
for(var i=1;i<6;i++){
	console.log(obj2['id_'+i]);
}                                                       //2 4 6 8 10

//思考obj3和obj4分别是什么
var obj3={};
for(var i=0;i<10;i++){
	obj3.i=i;
}
console.log(obj3);                                   //{i:9}

var obj4={};
for(var i=0;i<10;i++){
	obj4[i]=i;
}
console.log(obj4);                                  //{0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9}