#### 第 1 题：http的状态码中，499是什么？如何出现499，如何排查解决
499对应的是 “client has closed connection”，客户端请求等待链接已经关闭，这很有可能是因为服务器端处理的时间过长，客户端等得“不耐烦”了。还有一种原因是两次提交post过快就会出现499。

解决方法：
- 前端将timeout最大等待时间设置大一些
- nginx上配置proxy_ignore_client_abort on;

如果你用nodejs去实现爬虫 在生产环境上去爬定时爬接口和一些大型网站 很容易出现499 一版面试官会试着问一下你懂不懂499 如果懂的话 就会为怎么出现的 你是做什么项目出现的 然后引导你去说爬虫 + nodejs 一条路问下去

#### 第 2 题：讲解一下HTTPS的工作原理(三次握手)
HTTPS在传输数据之前需要客户端（浏览器）与服务端（网站）之间进行一次握手，在握手过程中将确立双方加密传输数据的密码信息。TLS/SSL协议不仅仅是一套加密传输的协议，更是一件经过艺术家精心设计的艺术品，TLS/SSL中使用了非对称加密，对称加密以及HASH算法。握手过程的简单描述如下：

1.浏览器将自己支持的一套加密规则发送给网站。

2.网站从中选出一组加密算法与HASH算法，并将自己的身份信息以证书的形式发回给浏览器。证书里面包含了网站地址，加密公钥，以及证书的颁发机构等信息。

3.获得网站证书之后浏览器要做以下工作：

- 验证证书的合法性（颁发证书的机构是否合法，证书中包含的网站地址是否与正在访问的地址一致等），如果证书受信任，则浏览器栏里面会显示一个小锁头，否则会给出证书不受信的提示。

- 如果证书受信任，或者是用户接受了不受信的证书，浏览器会生成一串随机数的密码，并用证书中提供的公钥加密。

- 使用约定好的HASH计算握手消息，并使用生成的随机数对消息进行加密，最后将之前生成的所有信息发送给网站。

4.网站接收浏览器发来的数据之后要做以下的操作：

- a) 使用自己的私钥将信息解密取出密码，使用密码解密浏览器发来的握手消息，并验证HASH是否与浏览器发来的一致。

- b) 使用密码加密一段握手消息，发送给浏览器。

5.浏览器解密并计算握手消息的HASH，如果与服务端发来的HASH一致，此时握手过程结束，之后所有的通信数据将由之前浏览器生成的随机密码并利用对称加密算法进行加密。

#### 第 3 题：讲解一下https对称加密和非对称加密。
对称加密：
发送方和接收方需要持有同一把密钥，发送消息和接收消息均使用该密钥。相对于非对称加密，对称加密具有更高的加解密速度，但双方都需要事先知道密钥，密钥在传输过程中可能会被窃取，因此安全性没有非对称加密高。

非对称加密：
接收方在发送消息前需要事先生成公钥和私钥，然后将公钥发送给发送方。发送放收到公钥后，将待发送数据用公钥加密，发送给接收方。接收到收到数据后，用私钥解密。
在这个过程中，公钥负责加密，私钥负责解密，数据在传输过程中即使被截获，攻击者由于没有私钥，因此也无法破解。
非对称加密算法的加解密速度低于对称加密算法，但是安全性更高。

几个名词要理清
- RSA：非对称加密
- AES：对称加密 生成一个随机字符串key 只有客户端和服务端有 他们两个通过这个key对数据加密和传输跟解密 这一个统称对称加密
- CA：权威认证机构 服务器在建站的时候 去CA认证机构认证 得到对应的数字签名 相当于身份证号 客户端每次安装浏览器的时候 都会下载最新的CA列表 这个列表有对应的数字- 签名和服务器IP一一对应的列表 这就是为什么我们自己搭建的localhost没法发https的原因 因为没法进行CA认证
- 数字证书：包含了数字签名跟RSA公钥
- 数字签名：保证数字证书一定是服务器传给客户端的 相当于服务器的身份证ID
- 对称密钥： 对数据进行加密的key
- 非对称密钥： （k1， k2） k1加密的数据 只有k2能解开 k1位非对称公钥 k2为非对称私钥
- 非对称公钥：RSA公钥 k1加密的数据 只有k2能解开
- 非对称私钥：RSA私钥 k1加密的数据 只有k2能解开

#### 第 4 题：如何遍历一个dom树
```js
function traversal(node) {
  //对node的处理
  if (node && node.nodeType === 1) {
    console.log(node.tagName);
  }
  var i = 0,
    childNodes = node.childNodes,
    item;
  for (; i < childNodes.length; i++) {
    item = childNodes[i];
    if (item.nodeType === 1) {
      //递归先序遍历子节点
      traversal(item);
    }
  }
}
```

#### 第 5 题：new操作符都做了什么

四大步骤：

1、创建一个空对象，并且 this 变量引用该对象 `let target = {}`;

2、继承了函数的原型。 `target.proto = func.prototype`;

3、属性和方法被加入到 this 引用的对象中。并执行了该函数func。 `func.call(target)`;

4、新创建的对象由 this 所引用，并且最后隐式的返回 this 。// 如果func.call(target)返回的res是个对象或者function 就返回它本身.

```js
function new(func) {
	lat target = {};
	target.__proto__ = func.prototype;
	let res = func.call(target);
	if (typeof(res) == "object" || typeof(res) == "function") {
		return res;
	}
	return target;
}
```

#### 第 6 题：手写代码，简单实现call

```js
Function.prototype.call2 = function(context) {
  var context = context || window; // 因为传进来的context有可能是null
  context.fn = this;
  var args = [];
  for (var i = 1; i < arguments.length; i++) {
    args.push("arguments[" + i + "]"); // 不这么做的话 字符串的引号会被自动去掉 变成了变量 导致报错
  }
  args = args.join(",");

  var result = eval("context.fn(" + args + ")"); // 相当于执行了context.fn(arguments[1], arguments[2]);

  delete context.fn;
  return result; // 因为有可能this函数会有返回值return
}
```

#### 第 7 题：手写代码，简单实现apply

```js
Function.prototype.apply2 = function(context, arr) {
  var context = context || window; // 因为传进来的context有可能是null
  context.fn = this;
  var args = [];
  var params = arr || [];
  for (var i = 0; i < params.length; i++) {
    args.push("params[" + i + "]"); // 不这么做的话 字符串的引号会被自动去掉 变成了变量 导致报错
  }
  args = args.join(",");

  var result = eval("context.fn(" + args + ")"); // 相当于执行了context.fn(arguments[1], arguments[2]);

  delete context.fn;
  return result; // 因为有可能this函数会有返回值return
}
```

#### 第 8 题：手写代码，简单实现bind

```js
Function.prototype.bind2 = function(context) {
  var _this = this;
  var argsParent = Array.prototype.slice.call(arguments, 1);
  return function() {
    var args = argsParent.concat(Array.prototype.slice.call(arguments)); //转化成数组
    _this.apply(context, args);
  };
}
```