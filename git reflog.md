# git reflog 时光穿梭机


女神说：“我们公司新来了一个前端小白，她对git不熟悉，辛辛苦苦加班一星期敲的代码没了。”
我：“噢？怎么没了”
女神：“在终端输入git log，列出所有的commit信息，如下图：”

![](https://user-gold-cdn.xitu.io/2019/3/31/169d3f51f6b601c5?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

女神：“commit的信息很简单，就是做了6个功能，每个功能对应一个commit的提交，分别是feature-1 到 feature-6”
我：“好的 然后呢”
女神：“然后前端小白坑爹了，执行了强制回滚，如下：”
`git reset --hard 2216d4e`
女神：“小白回滚到了 feature-1 上，并且回滚的时候加了 --hard ，导致之前 feature-2 到 feature-6的所有代码全部弄丢了，现在 git log 的显示如下：”

![](https://user-gold-cdn.xitu.io/2019/3/31/169d3f52b4fc39dc?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

女神：“现在feature-2 到 feature-6的代码没了”
女神：“小白还在这个基础上新添加了一个commit提交，信息叫feature-7，如下图：”

![](https://user-gold-cdn.xitu.io/2019/3/31/169d3f51ee1a0246?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

女神：“现在feature-2 到 feature-6全没了，还多了一个feature-7”
女神：“那么小蝌蚪 请问 如何把丢失的代码feature-2 到 feature-6全部恢复回来，并且feature-7的代码也要保留”
女神：“屌丝蝌蚪，开始你的表演”
我的笑容逐渐猖狂：“啊哈哈哈！这题我会！让爸爸教你”

## 解答

这个问题是一个很经典很经典的git问题，基本上，每次腾讯新闻部门有人来面试前端，只要他在简历上写“精通git”，我都会问这个问题，基本上90%的人答不出来。
其实用git reflog和git cherry-pick就能解决。
基本上掌握了git reflog和git cherry-pick，
你的git命令行操作就算是成功入门了。
来，接下来爸爸就一一讲解如何操作。


你只需要在终端里输入：

`git reflog`

复制代码然后就会展示出所有你之前git操作，你以前所有的操作都被git记录了下来，如下图：

![](https://user-gold-cdn.xitu.io/2019/3/31/169d3f51f76f0308?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

这时候要记好两个值：4c97ff3和cd52afc，他们分别是feature-7和feature-6的hash码。然后执行回滚，回到feature-6上：

`git reset --hard cd52afc`

复制代码现在我们回到了feature-6上，如下图：
![](https://user-gold-cdn.xitu.io/2019/3/31/169d3f51f6b601c5?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

好的，我们回到了feature-6上，但是feature-7没了，如何加上来呢？
这个时候就用上了`git cherry-pick`，刚刚我们知道了feature-7的hash码为4c97ff3，操作如下：
`git cherry-pick 4c97ff3`
复制代码输入好了以后，你的feature-7的代码就回来了。
期间可能会有一些冲突，按照提示解决就好。最后的结果如下图：

![](https://user-gold-cdn.xitu.io/2019/3/31/169d3f52baa26b7e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

是不是很简单，feature-1 到 feature-7的代码就合并到了一起，以前的代码也都回来了。