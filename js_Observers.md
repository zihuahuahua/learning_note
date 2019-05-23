### JS中的观察者们 —— 四种 Observers

#### Intersection Observer

当你想监听某个元素，当它在视口中可见的时候希望可以得到通知，这个API就是最佳的选择了。以往我们的做法是绑定容器的scroll事件，或者设定时器不停地调用getBoundingClientRect() 获取元素位置， 这样做的性能会很差，因为每次获取元素的位置都会引起整个布局的重新计算。还有一个场景是，如果你的元素被放在iframe里，如一些广告，想要知道他们何时出现几乎是不可能的。
现在，我们完全可以把这些工作交给IntersectionObserver了。

```js
var observer = new IntersectionObserver(callback[, options]);
```

callback 是一个回调函数，里面返回监听目标元素的实时数据组成的数组
- time 时间戳
- rootBounds 根元素的位置信息
- boundingClientRect 目标元素的位置信息
- intersectionRect 交叉部分的位置信息
- intersectionRatio 目标元素的可见比例，看下图示
- target等
options 是一些配置
- root 目标元素的祖先元素，即该元素必须是目标元素的直接或间接父级
- rootMargin 一个在计算交叉值时添加至root的边界盒中的一组偏移量，写法类似CSS的margin
- threshold 规定了一个监听目标与边界盒交叉区域的比例值，可以是一个具体的数值或是一组0.0到1.0之间的数组

开始监听元素：
```js
observer.observe(target)
```
这两步之后，就可以在callback里补全业务代码了。

此外，还有两个方法：

停止对某目标的监听
```js
observer.unobserve(target)
```
终止对所有目标的监听
```js
observer.disconnect()
```

#### Mutation Observer
当我们想知道某个元素在某个时候发生了具体哪些变化时，MutationObserver便是最佳选择了。

实例化一个观察器：
```js
var observer = new MutationObserver(callback);
```
开始监听：
```js
observer.observe(target, config);
```
config 填写需要监听属性
- attributes 布尔类型 属性的变动
- childList 布尔类型 子节点的变动（指新增，删除或者更改）
- characterData 布尔类型 节点内容或节点文本的变动。
- subtree 布尔类型 是否将该观察器应用于该节点的所有后代节点
- attributeOldValue 布尔类型 观察attributes变动时，是否需要记录变动前的属性值
- characterDataOldValue 布尔类型 观察characterData变动时，是否需要记录变动前的值
- attributeFilter 数组 需要观察的特定属性（比如['class','src']）

#### Resize Observer
监听元素的尺寸变化。
之前为了监听元素的尺寸变化，都将侦听器附加到window中的resize事件。对于不受窗口变化影响的元素就没那么简单了。 现在我们可以使用该API轻松的实现

```js
var observer = new ResizeObserver(callback);
observer.observe(target);
```

但是它的触发也是有条件的，下面是触发和不触发的条件：

触发

1.元素被插入或移除时触发
2.元素display从显示变成 none 或相反过程时触发
不触发

1.对于不可替换内联元素不触发
2.CSS transform 操作不触发


#### Performance Observer
PerformanceObserver 是个相对比较复杂的API，用来监控各种性能相关的指标。 该API由一系列API组成：

- Performance Timeline Level 2
- Paint Timing 1
- Navigation Timing Level 2
- User Timing Level 3
- Resource Timing Level 2
- Long Tasks API 1

```js
var observer = new PerformanceObserver(callback);
observer.observe({ entryTypes: [entryTypes] });
```
entryTypes: 需要监控的指标名，这些指标都可以通过 performance.getEntries() 获取到，此外还可以通过 performance.getEntriesByName() 、performance.getEntriesByType() 分别针对 name 和 entryType 来过滤。

- mark 获取所有通过 performance.mark(markName) 做的所有标记
- measure 获取通过 performance.measure(measureName, markName_start, markName_end) 得到的所有测量值
- longtask 监听长任务（超过50ms 的任务）（不足：只能监控到长任务的存在，貌似不能定位到具体任务）
- paint 获取绘制相关的性能指标，分为两种：“first-paint”、“first-contentful-paint”
- navigation 各种与页面有关的时间，可通过 performance.timing 获取
- resource 各种与资源加载相关的信息
相较之前的各种操作，现在我们代码仅需要像这样就可以了——
```js
const observer = new PerformanceObserver((list) => {
   let output;
   for (const item of list.getEntries()) {
       //业务代码
   }
});

observer.observe({
    //按需要填写
    entryTypes: ['mark', 'measure', 'longtask', 'paint', 'navigation', 'resource'] 
});
```