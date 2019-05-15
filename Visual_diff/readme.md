首先，以图片中心为原点，获取鼠标移动的坐标

根据我们想要得到的图片与鼠标之间的交互效果，为了方便计算，以图片的中心为原点，建立一个坐标轴。 那么以这个坐标轴为基准，计算鼠标在图片上滑过时的坐标js为：
```js
$('.container').mousemove(function () {
    //以图片中心为原点，鼠标的横纵坐标：mousex,mousey
    let mousex = event.clientX - $('.container').offset().left - $('.container').width() / 2;
    let mousey = event.clientY - $('.container').offset().top - $('.container').height() / 2;
  })
```
css中的transform属性。

`transform 属性向元素应用 2D 或 3D 转换。该属性允许我们对元素进行旋转、缩放、移动或倾斜。`

其中，我们需要应用的语法有：

| 值                 | 描述                           |
| ------------------- | -------------------------------- |
| rotateX(angle)      | 定义沿着 X 轴的 3D 旋转。 |
| rotateY(angle)      | 定义沿着 Y 轴的 3D 旋转。 |
| perspective(n)      | 为 3D 转换元素定义透视视图。 |
| matrix(a,b,c,d,e,f) | 定义 2D 转换，使用六个值的矩阵。 |

假设内部图片（佩奇）的中心点坐标为（x,y）。  已知：transform的旋转默认是围绕着佩奇的中心点坐标（x,y）的，问：如何通过`transform:matrix(a,b,c,d,e,f)`中六个参数我们可以对小猪仔进行2D转换？
解：
matrix，顾名思义，这个2D转换与矩阵有着不可言说的关系。 `transform:matrix(a,b,c,d,e,f)`中六个参数相对应的矩阵为：
![](https://user-gold-cdn.xitu.io/2019/5/14/16ab4d98ffa1cdc5?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
相应的，这六个参数对(o,o)坐标的影响计算公式为：
![](https://user-gold-cdn.xitu.io/2019/5/14/16ab4da2a8cd7255?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
经过2D转换后中心点的横纵坐标为：
```
x = ax+cy+e
y = bx+dy+f
```

举个栗子，我们想让小猪水平往左挪5px，再垂直往上挪2px，设置`transform:matrix(1,0,0,1,5,2)`就可以了。
因此,当我们需要利用`transform:matrix(a,b,c,d,e,f)`对小猪进行平面位置上对偏移操作时，只要记住：
`transform:matrix(a,b,c,d,水平偏移值,垂直偏移值)`
