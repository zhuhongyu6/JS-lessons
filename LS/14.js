//对象属性特征



//for...in遍历不到原型链上的某些属性
var objProto={
	z:3
}
var obj=Object.create(objProto);
obj.x=1;
obj.y=2;
console.log(obj.x);                                       //1
console.log(obj.y);                                       //2
console.log(obj.z);                                       //3
console.log(obj.toString);                                //f tostring(){}
for(var k in obj){
	console.log(k,obj[k])
}                                                        //x 1;y 2; z 3(不能遍历到toString)



//JS对象属性(数据属性)的特性
//属性的值(value):对应属性的值;可写特性(writable):确定属性是否可写;
//可配置特性(configurable):确定属性是否能删除和其它特性是否可配置;可枚举特性(enumerable):属性是否可枚举。
//设置属性的特性(Object的defineProperty方法设置)
var obj={
	x:1,
	y:2
};
Object.defineProperty(obj,'x',{enumerable:false});
for(var k in obj){
	console.log(k,obj[k]);
}                                                           //y 2 

var person={name:'Jack'};
Object.defineProperty(person,'name',{
	writable:false,
	configurable:false,
	enumerable:true,
	value:'Mike'
});
console.log(person.name);                                   //Mike
person.name = "Lucy";
console.log(person.name);                                   //Mike
delete person.name;
console.log(person.name);                                   //Mike

var person = {name:"Jack"};
Object.defineProperty(person,"name",{
    writable:true,
    configurable:true,
    enumerable:true,
    value:"Mike"
});
console.log(person.name);                                   //Mike
person.name = "Lucy";
console.log(person.name);                                   //Lucy
delete person.name;
console.log(person.name);                                   //undefined


//给对对象添加属性
//直接给对象添加属性(所有特性默认为true)
var obj = {
    x:1,
    y:2
};
obj.z = 3;
for(var k in obj){
    console.log(k,obj[k]);
}                                                           //x 1,y 2,z 3
//通过Object的defineProperty方法添加(除了手动修改的特性，其它特性默认为false)
var obj={
	x:1,
	y:2
};
obj.z=3;
Object.defineProperty(obj,'w',{value:456,configurable:true});
for(var k in obj){
	console.log(k,obj[k]);
}                                                           //x 1,y 2,z 3
console.log(obj.w);                                         //456




//JS对象访问器属性
//可配置性(confifurable)：确定属性能否被删除和其它特性是否可配置;可枚举特性(enumerable):确定属性是否可枚举
//读取属性特性(get):在读取属性时调用的函数，默认为undefine;写入属性特性(set):在写入属性时调用的函数，默认为undefine

//添加访问器
var obj1={
    _name:"Lucy"
};
Object.defineProperty(obj1,"name",{
    get:function (){//只定义了get 特性，因此只能读不能写
        return this._name;
    }
});
console.log(obj1.name);                                       //"Lucy"
obj1.name="jack";//只定义了getter访问器，因此写入失效
console.log(obj1.name);                                       //"Lucy"
//改变访问器属性特性 注意添加访问器和修改访问器特性的写法的区别
var obj2={
    _name:"Lucy",
    set name(val){this._name = val;},
    get name(){return this._name;}
};
Object.defineProperty(obj2,"name",{
    get:function (){
        return this._name+"_hihi";
    },
    set:function (val) {
        this._name = val+"_haha";
    }
});
console.log(obj2.name);                                     //Lucy_hihi
obj2.name="jack";
console.log(obj2.name);                                     //Jack_haha_hihi
//设置访问器属性特性
var person = {_name:"Jack"};
Object.defineProperty(person,"name",{
    configurable:false,
    enumerable:true,
    set:function(val){this._name = val},
    get:function(){return this._name}
});
console.log(person.name);                                   //Jack
person.name = "Lucy";
console.log(person.name);                                   //Lucy
delete person.name;
console.log(person.name);                                   //Lucy



//属性特性描述符(是一个用来查看对象属性特性的对象，该对象包含4个属性，分别对应对象属性的4个特性，
//通过Object的getOwnPropertyDescriptor方法获得)
var obj={x:5};
Object.defineProperty(obj,'y',{
	configurable:false,
	writable:false,
	enumerable:true,
	value:6
});
Object.defineProperty(obj,'z',{
	configurable:false,
	value:7
})
Object.getOwnPropertyDescriptor(obj,'x');               //{value: 5, writable: true, enumerable: true, configurable: true}
Object.getOwnPropertyDescriptor(obj,'y');               //{value: 6, writable: false, enumerable: true, configurable: false}
Object.getOwnPropertyDescriptor(obj,'z');               //{value: 7, writable: false, enumerable: false, configurable: false}



//给多个属性设置特性的方法(Object.defineProperties)
var obj={_x:1};
Object.defineProperties(obj,{
    y:{value:2,writable:true,configurable:true,enumerable:true},
    z:{value:2,writable:true,configurable:true,enumerable:true},
    x:{
  	    get:function(){return this._x;},
	    set:function(val){this._name=val;} 
      }
});
//批量添加属性并设置属性特性 book实例
var book={};
Object.defineProperties(book,{
	_year:{value:2004,writable:true},
	edition:{value:1,writable:true},
	year:{
			get:function(){return this,_year;},
			set:function(newValue){
				if(newValue>2004){
					this._year=newValue;
					this.edition+=newValue-2004;
				}
			}
		 }
});
book.year=2006;

//关于Object.create的第二个属性，思考x是empty自身属性还是obj2的自身属性？
var empty = {};
var obj2 = Object.create(empty,{
   x:{value:1}, y:{value:2,enumerable:true}
});
console.log(obj2);                                                     //{y:2,x:1}
console.log(obj2.hasOwnProperty("x"));                                 //true(即x是obj2的自身属性)


//属性特性的继承特点
var o1={};
Object.defineProperty(o1,'x',{value:12});
o1.x=34;
console.log(o1.x);                                                      //12
var o2=Object.create(o1);
o2.x=56;
console.log(o2.x);                                                      //12

var o1={};
Object.defineProperty(o1,'x',{value:12,writable:true});
o1.x=34;
console.log(o1.x);                                                      //34
var o2=Object.create(o1);
o2.x=56;
console.log(o2.x);                                                      //56
//访问器属性特性的继承特点
var o3 = {_x:21};
Object.defineProperty(o3,"x",{
    get:function(){return this._x}
});
o3.x = 34;
console.log(o3.x);                                                      //21

var o4 = Object.create(o3);
Object.defineProperty(o4,"x",{
    set:function (val) {
        this._x = val;
    },
    get:function () {
        return ++this._x;
    }
});
o4.x = 56;
console.log(o4.x);                                                      //57

//全局变量的属性特性是如何的呢？
var a = 23;
console.log(Object.getOwnPropertyDescriptor(window,"a"));//{value: 23, writable: true, enumerable: true, configurable: false}
delete a//等效delete window.a;                            //false



// 要求掌握下述方法的使用
// Object.keys() 返回所有自有（非继承）可枚举属性的键
// Object.getOwnPropertyNames()返回所有自有（非继承）键，包括不可枚举
// Object.prototype.hasOwnProperty() 判断自身是否有该属性，包括不可枚举的属性
// Object.prototype.propertyIsEnumerable() 判断自身是否有该属性并检测该属性是否可枚举
// in  检测一个对象是否有某个属性，包括继承的属性，包括不可枚举的属性
// for...in 遍历一个对象的属性，包括继承的属性，但不包括不可枚举的属性
// 思考Object静态方法和Object.prototype原型方法的区别
var o3 = {};
o3.y = "yyy";
Object.defineProperty(o3,"x",
    {configurable:true,enumerable:false,writable:true,value:"xxx"}
);
console.log(Object.keys(o3));                                       //['y']
console.log(Object.getOwnPropertyNames(o3));                        //['y','x']
console.log(o3.hasOwnProperty("x"));                                //true
console.log(o3.propertyIsEnumerable("x"));                          //false
for(var k in o3){ //遍历不到x属性
    console.log(k,o3[k]);
}                                                                   //y yyy
console.log("x" in o3,"y" in o3);                                   // true true
console.log(o3.hasOwnProperty("x"),o3.hasOwnProperty("y"));         //true true

//遍历属性综合实例
var o4 = {};
o4.a = "aaa";
Object.defineProperty(o4,"b",
    {configurable:true,enumerable:false,writable:true,value:"bbb"}
);
var o5 = Object.create(o4);
o5.c = 234;
Object.defineProperty(o5,"d",{enumerable:false,value:567});
for(var k in o5){
    if(o5.hasOwnProperty(k)){
        console.log("o5 自有可遍历属性：",k,o5[k]);
    }else {
        console.log("o5 非自有可遍历属性：",k,o5[k]);
    }
}                                                                   //o5 自有可遍历属性:c 234       o5 非自有可遍历属性： a aaa
console.log(o5.propertyIsEnumerable("a"),
    o5.propertyIsEnumerable("b"),
    o5.propertyIsEnumerable("c"),
    o5.propertyIsEnumerable("d")
);                                                                  //false false true false
console.log("a" in o5,"b" in o5,"c" in o5,"d" in o5);               //true true true true
console.log(Object.keys(o5));//只显示自身可枚举的属性                 //['c']
console.log(Object.getOwnPropertyNames(o5));                        //['c','d']
console.log(o4.isPrototypeOf(o5));                                  //true




//JS对象扩展(Object.isExtensible()、Object.preventExtensions())、密封(Object.isSeal()、Object.seal())、冻结(Object.isFrozen()、Object.freeze())
var empty1 = {a:1};
console.log(Object.isExtensible(empty1));                           //true
//对象是否可以扩展与对象的属性是否可以配置无关
empty2 = Object.create({},{
    "a":{
        value : 1,
        configurable : false,//不可配置
        enumerable : true,//可枚举
        writable : true//可写
    }
});
console.log(Object.isExtensible(empty2));                         //true