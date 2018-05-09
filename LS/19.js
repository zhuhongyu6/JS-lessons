//JS标准内置对象-构造器(Date)


//通过构造函数创建Date对象的4种方式
//方式一：new Date(year,month,date?,hours?,minutes?,seconds?,milliseconds?) 
//注意：月0-11，日：1-31，时：0-23，分：0-59，秒：0-59，毫秒：0-999(年份为2位自动加1900)  
var date1 = new Date(2017,9,18,12,34,1);               
console.log(date1);                                      //Wed Oct 18 2017 12:34:01 GMT+0800 (中国标准时间)
var date2 = new Date(17,9,18,12,34,1);                  
console.log(date2);                                     //Thu Oct 18 1917 12:34:01 GMT+0800 (中国标准时间)
//方式二：new Date(dateTimeStr):参数为字符串类型，
//注意日期的格式 此处的08代表8月，
var date3 = new Date("2017-08-09");
console.log(date3);                                     //Wed Aug 09 2017 08:00:00 GMT+0800 (中国标准时间)
//方式三：new Date(timeValue)：参数为数字类型，以毫秒为单位
var date4 = new Date(0);                    
console.log(date4);                                         //1970-01-01:00:00:00     
var date4 = new Date(1000); 
console.log(date4);                                         //1970-01-01:00:00:01
date4.getTime();                                            //1000
//方式四：返回当前时间
var date5 = new Date();//new Date(Date.now());
console.log(date5);                                         //Tue May 08 2018 20:43:48 GMT+0800 (中国标准时间)
//无效时间
var date6 = new Date(NaN);
console.log(date6);                                         //Invalid Date
date6 instanceof(Date)                                      //true
//有无new的区别
var d1 = new Date();
var d2 = Date();
console.log(d1,typeof d1);                                  //object
console.log(d2,typeof d2);                                  //string
//补充思考
var n1 = new Number("123");
var n2 = Number("123");
console.log(n1,typeof n1);                                  //object
console.log(n2,typeof n2);                                  //number


//Date静态方法
//以毫秒为单位返回当前时间（从1970年1月1日00:00:00开始计算）
console.log(Date.now());                                    //1525868221174
console.log((new Date()).getTime());                        //1525868279238
//dateTimeString字符串转换成毫秒（从1970年1月1日00:00:00开始计算）
console.log(Date.parse("1970-01-01"));                      //0
console.log(Date.parse("1970-01-02"));                      //86400000
//将给定的日期转换成毫秒,解释为UTC 协调世界时间(标准时间)
console.log(Date.UTC(2017,9,1));                            //1506816000000

//Date原型方法
//getter和setter相关
var d = new Date("1978-11-25");
console.log(d.getFullYear(),d.getMonth(),d.getDay(),d.getDate(),d.getHours());        //1978 10 6 25 8
console.log(d.getTimezoneOffset());                                                   //-480
d.setDate(11);
console.log(d.getFullYear(),d.getMonth(),d.getDay(),d.getDate(),d.getHours());        //1978 10 6 11 8
d.setFullYear(1999,5,3);
console.log(d.getFullYear(),d.getMonth(),d.getDay(),d.getDate(),d.getHours());        //1999 5 4 3 8
//Date原型方法 转成字符串相关
var d = new Date(2012,3,21,15,7,23,234);
console.log(d.toTimeString(),"___",d.toLocaleTimeString());         //15:07:23 GMT+0800 (中国标准时间) ___ 下午3:07:23
console.log(d.toDateString(),"___",d.toLocaleDateString());         //Sat Apr 21 2012 ___ 2012/4/21
console.log(d.toJSON());                                            //2012-04-21T07:07:23.234Z


//Date日期格式(T代表时间，Z代表时区信息)
// YYYY-MM-DDTHH:mm:ss.sssZ
console.log(Date.parse("2010-01-01 11:12:23.111"));                //1262315543111
console.log(new Date("2010-01-01 11:12:23.111"));                  //Fri Jan 01 2010 11:12:23 GMT+0800 (中国标准时间)
console.log(new Date().toISOString());                             //2018-05-09T12:39:54.699Z
console.log(Date.parse("2010-01-01T11:12:23.111Z"));               //1262344343111
console.log(new Date("2010-01-01T11:12:23.111Z"));                 //Fri Jan 01 2010 19:12:23 GMT+0800 (中国标准时间)
console.log(new Date().toISOString());                             //2018-05-09T12:43:31.127Z
//日期格式（无时间）
console.log(new Date("2001"));                                     //Mon Jan 01 2001 08:00:00 GMT+0800 (中国标准时间)
console.log(new Date("2001-02"));                                  //Thu Feb 01 2001 08:00:00 GMT+0800 (中国标准时间)
console.log(new Date("2001-02-22"));                               //Thu Feb 22 2001 08:00:00 GMT+0800 (中国标准时间)
//日期和时间格式
console.log(new Date("1999-11-22T13:17"));                          //Mon Nov 22 1999 13:17:00 GMT+0800 (中国标准时间)
console.log(new Date("1999-11-22T13:17:11"));                       //Mon Nov 22 1999 13:17:11 GMT+0800 (中国标准时间)
console.log(new Date("1999-11-22T13:17:11.111"));                   //Mon Nov 22 1999 13:17:11 GMT+0800 (中国标准时间)
console.log(new Date("1999-11-22T13:17:11.111Z"));                  //Mon Nov 22 1999 21:17:11 GMT+0800 (中国标准时间)

//时间的比较和运算，内部转换为数字进行比较和运算（从1970年1月1日00:00:00开始计算）
console.log(new Date("1970-01-01").getTime());                      //0
console.log(new Date("1970-01-02").getTime());                      //86400000
console.log(new Date("1960-01-02").getTime());                      //-315532800000
console.log(new Date("1970-01-02") > new Date("1970-01-01"));       //true
console.log(new Date("1970-01-02") - new Date("1970-01-01"));       //86400000
console.log(new Date((new Date("1970-01-01").getTime())+86400000)); //Fri Jan 02 1970 08:00:00 GMT+0800 (中国标准时间)

