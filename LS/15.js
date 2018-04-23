//JS原型继承




//3种方式创建对象
//通过字面量直接创建对象
var obj = {
    num:10,
    str:"Hi",
    show:function(){
        return this.str;
    }
};
console.log(obj.num);                                               //10
console.log(obj.str);                                               //Hi
console.log(obj.show());                                            //Hi
//通过Object工场方法创建JS对象
var newObj = Object.create(obj);
newObj.age = 23;
console.log(newObj.num);                                            //10
console.log(newObj.str);                                            //Hi
console.log(newObj.show());                                         //Hi
console.log(newObj.age);                                            //23

var empty = {};
var obj2 = Object.create(empty,{
   x:{value:1}, y:{value:2,enumerable:true}
});
console.log(obj2);                                                  //{y: 2, x: 1}
console.log(obj2.hasOwnProperty("x"));                              //true
//构造函数的方式创建JS对象  
function Person(name,age){
    this.name = name;
    this.age = age;
}
Person.prototype.sayName = function(){
    console.log("hello,i'm",this.name,this.age,"years old");
};

var person1 = new Person("Mike",21);
person1.sayName();                                                  //hello,i'm, Mike 21


//JS继承方式(JS采用原型继承，任何方式创建的对象都有原型对象，可以通过对象的__proto__属性来访问)
var obj = {
    num:10,
    str:"Hi",
    show:function(){
        return this.str;
    }
};
console.log(obj.__proto__ === Object.prototype);                    //true


var newObj = Object.create(obj);
var newObj2 = Object.create(obj);
newObj.age = 23;
console.log(newObj.__proto__ === obj);                              //true
console.log(newObj2.__proto__ === obj);                             //true
console.log(newObj.__proto__.__proto__===Object.prototype);         //true
console.log(newObj.__proto__.__proto__.__proto__===null);           //true


//JS对象的原型链
var proObj = {
    z:3
};
var obj = Object.create(proObj);
obj.x = 1;
obj.y = 2;
console.log(obj.x);                                                 //1
console.log(obj.y);                                                 //2
console.log(obj.z);                                                 //3
console.log("z" in obj);                                            //true
console.log(obj.hasOwnProperty("z"));                               //false
//原型链属性操作
obj.z = 5;
console.log(obj.hasOwnProperty("z"));                               //true
console.log(obj.z);                                                 //5
console.log(proObj.z);                                              //3
obj.z = 8;
console.log(obj.z);                                                 //8
delete obj.z;//true
console.log(obj.z);                                                 //3
delete obj.z;//true
console.log(obj.z);                                                 //3
delete  obj.__proto__.z;//或者delete proObj.z;
console.log(obj.z);                                                 //undefine


//基于构造函数实现的原型对象
function Person(name) {
    this.name = name;
    this.age = 21;
}
Person.prototype.sayHi = function () {
    console.log("Hi,i'm ",this.name,this.age,"years old!");
};
var p1 = new Person("Mike");
console.log(p1.name);                                               //Mike
console.log(p1.age);                                                //21
p1.sayHi();                                                         //Hi,i'm  Mike 21 years old!
console.log(p1.__proto__ === Person.prototype);                     //true
console.log(Person.__proto__===Function.prototype);		            //true
console.log(Person.__proto__.__proto__===Object.prototype);	        //true
console.log(Person.__proto__.__proto__.__proto__==null);	        //true

function MyObj() {} 
MyObj.prototype.z = 3;
var obj = new MyObj();
obj.x = 1;
obj.y = 2;
console.log(obj.x);                                                 //1
console.log(obj.y);                                                 //2
console.log(obj.z);                                                 //3
console.log("z" in obj);                                            //true
console.log(obj.hasOwnProperty("z"));                               //false
obj.z = 5;
console.log(obj.hasOwnProperty("z"));                               //true
console.log(obj.z);                                                 //5
console.log(MyObj.prototype.z);                                     //3
obj.z = 8;
console.log(obj.z);                                                 //8
delete obj.z;//true
console.log(obj.z);                                                 //3
delete obj.z;//true
console.log(obj.z);                                                 //3
delete  obj.__proto__.z;//或者delete MyObj.prototype.z;
console.log(obj.z);                                                 //undefine