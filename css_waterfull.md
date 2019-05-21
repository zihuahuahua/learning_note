#### 纯CSS响应式瀑布流 columns
```css
* {
  margin: 0;
  padding: 0;
}
.waterfalls {
  padding:10px;
  position: relative;
  margin: 0 auto;
  columns:200px;  /* 每列每个元素最小的宽度 */
  column-gap: 20px; /* 每列的距离，不设置这个可以通过margin来设置边距 */
}   
.box {
  break-inside: avoid; /* 这个是设置多列布局页面下的内容盒子如何中断，如果不加上这个，每列的头个元素就不会置顶，配合columns使用 */
  margin-bottom:15px;/* 如果是非图片瀑布流的话就加上背景吧，不然感觉不太好看。 */      /* background:dodgerblue; */ 
  color:white;
  border-radius:5px;
}
.pic img {      
  width: 100%; /* 建议每个图片宽高为100%，如果不设置宽高，就会溢出外层盒子的，或者设置固定宽度，最好不要宽过外层盒子或者高过外层盒子。这里说的外层盒子就是html代码里的 .box */
  height: 100%; 
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
```
```html
<div class="waterfalls">
  <div class="box">
    <div class="pic">
      <img src="images/1.jpg" alt="1.jpg">
    </div>
  </div>
  <div class="box">
    <div class="pic">
      <img src="images/1.jpg" alt="1.jpg">
    </div>
  </div>
</div>
```