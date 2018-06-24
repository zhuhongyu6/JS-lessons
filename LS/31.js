//ES6新增数据类型和数据结构



//对象属性名冲突问题(为对象新增一些属性，那么你新增的属性名就很可能和原来的属性名发送冲突)
var obj = {
    x:1,
    y:2,
    moveTo:function(x,y){
        this.x = x;
        this.y = y;
    }
}
obj.moveTo = function(x,y){
    console.log("方法被覆盖了");
};
obj.moveTo(0,0);
//ES6新增的数据类型Symbol(产生独一无二的值,是基本数据类型的一种，不能用new)
let s = Symbol();//不能用new
typeof s;                                               // "symbol"
//Symbol函数可以接受一个字符串作为参数，表示对Symbol实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。
var s1 = Symbol('foo');
var s2 = Symbol('bar');
console.log(s1);                                        // Symbol(foo)
console.log(s2);                                        // Symbol(bar)
console.log(s1.toString());                             // "Symbol(foo)"
console.log(s2.toString());                             // "Symbol(bar)"
//Symbol函数的参数只是表示对当前Symbol值的描述，因此相同参数的Symbol函数的返回值是不相等的。
var s1 = Symbol();
var s2 = Symbol();
s1 === s2                                               // false

var s1 = Symbol("foo");
var s2 = Symbol("foo");
s1 === s2                                               // false
//如果 Symbol 的参数是一个对象，就会调用该对象的toString方法，将其转为字符串，然后才生成一个 Symbol 值
const obj = {
    toString() {
        return 'abc';
    }
};
const sym = Symbol(obj);
sym;                                                    // Symbol(abc)
//Symbol值不能与其他类型的值进行运算，会报错
var sym = Symbol('My symbol');
"your symbol is " + sym;                                //报错
//但是，Symbol值可以显式转为字符串。
var sym = Symbol('My symbol');
String(sym);                                            // 'Symbol(My symbol)'
sym.toString();                                         // 'Symbol(My symbol)'
//由于Symbol的值是唯一的，所以可以作为标识符，用于对象的属性名，避免出现同样的属性名，防止同名属性名被覆盖或改写
//使用Symbol用[]，而不用点操作符，[]内不加引号，(三种写法)
var mySymbol = Symbol();

var a = {};
a[mySymbol] = 'Hello!';
a[mySymbol];                                             // "Hello!"

var a = {
    [mySymbol]: 'Hello!'
};
a[mySymbol];                                             // "Hello!"

var a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });
a[mySymbol];                                             // "Hello!"
//下述代码，添加了2个属性，obj对象有2个属性(通过方括号结构和Object.defineProperty分别指定一个)
var aSymbol = Symbol("abc");
var obj = {
    [aSymbol]: 'Hello!'
};
Object.defineProperty(obj, Symbol("abc"), { value: 'World!' });
console.log(obj);                                       //{Symbol(abc): "Hello!", Symbol(abc): "World!"}
//Symbol值作为对象属性名时，不能用点运算符，使用中括号时注意使用引号和不用引号的区别
var mySymbol = Symbol();
var a = {};
a.mySymbol = 'Hello!';
a[mySymbol];                                             //undefined
a['mySymbol'];                                           // "Hello!"
//思考：
var myS1 = Symbol("xx");
var myS2 = "xx";
var obj = {
    [myS1]:123,
    [myS2]:456
};
console.log(obj[myS1],obj[Symbol("xx")]);               //123 undefined
console.log(obj[myS2],obj["xx"]);                       //456 456
console.log(obj["myS1"]);                               //undefined
console.log(obj["myS2"]);                               //undefined
//在对象的内部，使用Symbol值定义属性时，Symbol值必须放在方括号之中,如果不用[]的话相当于使用s对应的字符串定义属性
let s = Symbol();
let obj = {
    [s]: function (arg) {console.log("xx");}
};
obj[s](123);
// 采用增强的对象写法，上面代码的obj对象可以写得更简洁一些
let obj = {
    [s](arg) {console.log("xx");}
};
//遍历实例一
var obj = {};
var a = Symbol('a');
var b = Symbol('b');
obj[a] = 'Hello';
obj[b] = 'World';
var objectSymbols = Object.getOwnPropertySymbols(obj);
console.log(objectSymbols);                             // [Symbol(a), Symbol(b)]
//遍历实例二
var obj = {};
var foo = Symbol("foo");
Object.defineProperty(obj, foo, {
    value: "foo bar",
});
for (var i in obj) {
    console.log(i); // 无输出
}
Object.getOwnPropertyNames(obj);                        // []
Object.getOwnPropertySymbols(obj);                      // [Symbol(foo)]
//遍历Symbol属性：
var obj={};
Object.getOwnPropertySymbols(obj).forEach(function(v){console.log(v)});
//与Symbol复用相关的静态方法
var s1 = Symbol.for('foo');
var s2 = Symbol.for('foo');
console.log(s1 === s2);                                 // true
//Symbol.for()与Symbol()这两种写法，都会生成新的Symbol。
// 它们的区别是，前者会被登记在全局环境中供搜索，后者不会。
// Symbol.for()不会每次调用就返回一个新的Symbol类型的值，而是会先检查给定的key是否已经存在，
// 如果不存在才会新建一个值。比如，如果你调用Symbol.for("cat")30次，每次都会返回同一个Symbol值，
// 但是调用Symbol("cat")30次，会返回30个不同的Symbol值。
console.log(Symbol.for("bar") === Symbol.for("bar"));   // true
console.log(Symbol("bar") === Symbol("bar"));           // false
console.log(Symbol.for("bar") === Symbol("bar"));       // false
//Symbol.keyFor方法返回一个已登记的Symbol类型值的key
var s1 = Symbol.for("foo");
console.log(Symbol.keyFor(s1));                         // foo
var s2 = Symbol("foo");
console.log(Symbol.keyFor(s2));                         // undefined
//思考：
var s3 = Symbol(Symbol.keyFor(s1));
console.log(s1 === s3);                                 //false
console.log(s2 === s3);                                 //false
var s4 = Symbol.for(Symbol.keyFor(s1));
console.log(s1 === s4);                                 //true
console.log(s2 === s4);                                 //false



//新增的数据结构set
var s1 = new Set([1,2,3,4,5,5,6,2,2]);
console.log(s1);                                        //Set(6) {1, 2, 3, 4, 5, …}
//通过add方法向Set结构加入成员，set结构不会加入重复的值
var s2 = new Set();
[2, 3, 5, 4, 5, 2, 2].map(x => s2.add(x));
for (var i of s2) {
    console.log(i);
}                                                       // Set(4) {2, 3, 5, 4}
// 例一
var set = new Set([1, 2, 3, 4, 4]);
console.log([...set]);                                  // [1, 2, 3, 4]
//例二
var items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
console.log(items.size);                                // 5
//利用set实现数组去重
var set=new Set([1,2,3,5,5,5]);
console.log([...set]);		                            //[1,2,3,5]
//区分基本类型和引用（对象）类型，两个对象总是不相等的，思考下述代码
var set = new Set();
set.add({});
console.log(set.size);                                  // 1
set.add({});
console.log(set.size);                                  // 2
//Set的原型属性和方法
s.add(1).add(2).add(2);
s.size                                                  // 2
s.has(1);                                               // true
s.has(2);                                               // true
s.has(3);                                               // false
s.delete(2);
s.has(2);                                               // false

var properties = new Set();
properties.add('width');
properties.add('height');
console.log(properties.size);                           //2
if (properties.has('width')&&properties.has('height')) {
    console.log("do something!");
}                                                       //do something!
//Array.from方法可以将Set结构转为数组
var items = new Set([1, 2, 3, 4, 5]);
var array = Array.from(items);
console.log(array);                                     //[1,2,3,4,5]
//...也可以将set转换成数组
console.log([...(new Set([1, 2, 3, 4, 5]))]);           //[1, 2, 3, 4, 5]
//如果不加[]就是散列的元素
console.log(...(new Set([1, 2, 3, 4, 5])));             //1, 2, 3, 4, 5
//关于Set的遍历方法
var set = new Set(['red', 'green', 'blue']);
console.log(typeof set.keys());                         //object
console.log(typeof set.values());                       //object
console.log(typeof set.entries());                      //object
//keys方法、values方法、entries方法返回的都是遍历器对象
for (var item of set.keys()) {
    console.log(item);
}                                                       // red green blue

for (var item of set.values()) {
    console.log(item);
}                                                       // red green blue

for (var item of set.entries()) {
    console.log(item);
}                                                       // ["red", "red"]  ["green", "green"]  ["blue", "blue"]
//数组的map和filter方法也可以间接用于Set了，通过...转成数组后调用后再生成set
var set = new Set([1, 2, 3]);
set = new Set([...set].map(x => x * 2));                // 返回Set结构：{2, 4, 6}

var set = new Set([1, 2, 3, 4, 5]);
set = new Set([...set].filter(x => (x % 2) == 0));      // 返回Set结构：{2, 4}