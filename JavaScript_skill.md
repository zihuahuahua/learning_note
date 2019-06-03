### JavaScript开发技巧

##### String Skill

>时间对比：时间个位数形式需补0
```js
const time1 = "2019-03-31 21:00:00";
const time2 = "2019-05-01 09:00:00";
const overtime = time1 > time2;
// overtime => false
```

>格式化金钱
```js
const ThousandNum = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const money = ThousandNum(19941112);
// money => "19,941,112"
```

>生成随机ID
```js
const RandomId = len => Math.random().toString(36).substr(3, len);
const id = RandomId(10);
// id => "jg7zpgiqva"
```

>生成随机HEX色值
```js
const RandomColor = () => "#" + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0");
const color = RandomColor();
// color => "#f03665"
```

>生成星级评分
```js
const StartScore = rate => "★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate);
const start = StartScore(3);
// start => "★★★"
```

>操作URL查询参数
```js
const params = new URLSearchParams(location.search.replace(/\?/ig, "")); // location.search = "?name=yajun&sex=female"
params.has("yajun"); // true
params.get("sex"); // "female"
```



##### Number Skill

>取整：代替正数的Math.floor()，代替负数的Math.ceil()
```js
const num1 = ~~ 1.69;
const num2 = 1.69 | 0;
const num3 = 1.69 >> 0;
// num1 num2 num3 => 1 1 1
```

>补零
```js
const FillZero = (num, len) => num.toString().padStart(len, "0");
const num = FillZero(169, 5);
// num => "00169"
```

>转数值：只对null、""、false、数值字符串有效
```js
const num1 = +null;
const num2 = +"";
const num3 = +false;
const num4 = +"169";
// num1 num2 num3 num4 => 0 0 0 169
```

>时间戳
```js
const timestamp = +new Date("2019-03-31");
// timestamp => 1553990400000
```

>精确小数
```js
const RoundNum = (num, decimal) => Math.round(num * 10 ** decimal) / 10 ** decimal;
const num = RoundNum(1.69, 1);
// num => 1.7
```

>判断奇偶
```js
const OddEven = num => !!(num & 1) ? "odd" : "even";
const num = OddEven(2);
// num => "even"
```

>取最小最大值
```js
const arr = [0, 1, 2];
const min = Math.min(...arr);
const max = Math.max(...arr);
// min max => 0 2
```

>生成范围随机数
```js
const RandomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const num = RandomNum(1, 10);
```



##### Boolean Skill

>短路运算符
```js
const a = d && 1; // 满足条件赋值：取假运算，从左到右依次判断，遇到假值返回假值，后面不再执行，否则返回最后一个真值
const b = d || 1; // 默认赋值：取真运算，从左到右依次判断，遇到真值返回真值，后面不再执行，否则返回最后一个假值
const c = !d; // 取假赋值：单个表达式转换为true则返回false，否则返回true
```

>判断数据类型：undefined、null、string、number、boolean、array、object、symbol、date、regexp、function、asyncfunction、arguments、set、map、weakset、weakmap
```js
function DataType(tgt, type) {
    const dataType = Object.prototype.toString.call(tgt).replace(/\[object /g, "").replace(/\]/g, "").toLowerCase();
    return type ? dataType === type : dataType;
}
DataType("yajun"); // "string"
DataType(19941112); // "number"
DataType(true); // "boolean"
DataType([], "array"); // true
DataType({}, "array"); // false
```

>是否为空数组
```js
const arr = [];
const flag = Array.isArray(arr) && !arr.length;
// flag => true
```

>是否为空对象
```js
const obj = {};
const flag = DataType(obj, "object") && !Object.keys(obj).length;
// flag => true
```

>满足条件时执行
```js
const flagA = true; // 条件A
const flagB = false; // 条件B
(flagA || flagB) && Func(); // 满足A或B时执行
(flagA || !flagB) && Func(); // 满足A或不满足B时执行
flagA && flagB && Func(); // 同时满足A和B时执行
flagA && !flagB && Func(); // 满足A且不满足B时执行
```

>为非假值时执行
```js
const flag = false; // undefined、null、""、0、false、NaN
!flag && Func();
```

>数组不为空时执行
```js
const arr = [0, 1, 2];
arr.length && Func();
```

>对象不为空时执行
```js
const obj = { a: 0, b: 1, c: 2 };
Object.keys(obj).length && Func();
```

>函数退出代替条件分支退出
```js
if (flag) {
    Func();
    return false;
}
// 换成
if (flag) {
    return Func();
}
```

>switch/case使用区间
```js
const age = 26;
switch (true) {
  case isNaN(age):
    console.log("not a number");
    break;
  case (age < 18):
    console.log("under age");
    break;
  case (age >= 18):
    console.log("adult");
    break;
  default:
    console.log("please set your age");
    break;
}
```



##### Array Skill

>克隆数组
```js
const _arr = [0, 1, 2];
const arr = [..._arr];
// arr => [0, 1, 2]
```

>合并数组
```js
const arr1 = [0, 1, 2];
const arr2 = [3, 4, 5];
const arr = [...arr1, ...arr2];
// arr => [0, 1, 2, 3, 4, 5];
```

>去重数组
```js
const arr = [...new Set([0, 1, 1, null, null])];
// arr => [0, 1, null]
```

>混淆数组
```js
const arr = [0, 1, 2, 3, 4, 5].slice().sort(() => Math.random() - .5);
// arr => [3, 4, 0, 5, 1, 2]
```

>清空数组
```js
const arr = [0, 1, 2];
arr.length = 0;
// arr => []
```

>截断数组
```js
const arr = [0, 1, 2];
arr.length = 2;
// arr => [0, 1]
```

>交换赋值
```js
let a = 0;
let b = 1;
[a, b] = [b, a];
// a b => 1 0
```

>过滤空值：undefined、null、""、0、false、NaN
```js
const arr = [undefined, null, "", 0, false, NaN, 1, 2].filter(Boolean);
// arr => [1, 2]
```

>异步累计
```js
async function Func(deps) {
    return deps.reduce(async(t, v) => {
        const dep = await t;
        const version = await Todo(v);
        dep[v] = version;
        return dep;
    }, Promise.resolve({}));
}
const result = await Func(); // 需在async包围下使用
```

>数组首部插入成员
```js
let arr = [1, 2]; // 以下方法任选一种
arr.unshift(0);
arr = [0].concat(arr);
arr = [0, ...arr];
// arr => [0, 1, 2]
```

>数组尾部插入成员
```js
let arr = [0, 1]; // 以下方法任选一种
arr.push(2);
arr.concat(2);
arr[arr.length] = 2;
arr = [...arr, 2];
// arr => [0, 1, 2]
```

>统计数组成员个数
```js
const arr = [0, 1, 1, 2, 2, 2];
const count = arr.reduce((t, c) => {
    t[c] = t[c] ? ++ t[c] : 1;
    return t;
}, {});
// count => { 0: 1, 1: 2, 2: 3 }
```

>解构数组成员嵌套
```js
const arr = [0, 1, [2, 3, [4, 5]]];
const [a, b, [c, d, [e, f]]] = arr;
// a b c d e f => 0 1 2 3 4 5
```

>解构数组成员别名
```js
const arr = [0, 1, 2];
const { 0: a, 1: b, 2: c } = arr;
// a b c => 0 1 2
```

>解构数组成员默认值
```js
const arr = [0, 1, 2];
const [a, b, c = 3, d = 4] = arr;
// a b c d => 0 1 2 4
```

>获取随机数组成员
```js
const arr = [0, 1, 2, 3, 4, 5];
const randomItem = arr[Math.floor(Math.random() * arr.length)];
// randomItem => 1
```

>创建指定长度数组
```js
const arr = [...new Array(3).keys()];
// arr => [0, 1, 2]
```

>创建指定长度且值相等的数组
```js
const arr = new Array(3).fill(0);
// arr => [0, 0, 0]
```

>reduce代替map和filter
```js
const _arr = [0, 1, 2];

// map
const arr = _arr.map(v => v * 2);
const arr = _arr.reduce((t, c) => {
    t.push(c * 2);
    return t;
}, []);
// arr => [0, 2, 4]

// filter
const arr = _arr.filter(v => v > 0);
const arr = _arr.reduce((t, c) => {
    c > 0 && t.push(c);
    return t;
}, []);
// arr => [1, 2]

// map和filter
const arr = _arr.map(v => v * 2).filter(v => v > 2);
const arr = _arr.reduce((t, c) => {
    c = c * 2;
    c > 2 && t.push(c);
    return t;
}, []);
// arr => [4]
```