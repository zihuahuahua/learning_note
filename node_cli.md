## 从零开发一个node命令行工具
#### 创建一个项目
```shell
创建一个项目
# 1.创建一个目录：
mkdir kid-cli && cd kid-cli
# 2.因为最终我们要把cli发布到npm上，所以需要初始化一个程序包: 
npm init
# 3.创建一个index.js文件
touch index.js
# 4.打开编辑器(vscode)
code  .
```
>安装 `code` 命令，运行 `VS code` 并打开命令面板（ `⇧⌘P`），然后输入 `shell command` 找到: `Install 'code' command in PATH` 就行了。

打开index.js文件，添加一段测试代码：

```js
#!/usr/bin/env node

console.log('hello world!')
```
终端运行 node 程序，需要先输入 node 命令，比如
```shell
node index.js
```
可以正确输出 hello world!，代码顶部的 `#!/usr/bin/env node`是告诉终端，这个文件要使用 node 去执行。
#### 创建一个命令
一般 cli都有一个特定的命令，比如 git，刚才使用的 code 等，我们也需要设置一个命令，就叫  kid 吧！如何让终端识别这个命令呢？很简单，打开 `package.json` 文件，添加一个字段 bin，并且声明一个命令关键字和对应执行的文件：
```json
......
  "bin": {
    "kid": "index.js"
  },
......
```

>如果想声明多个命令，修改这个字段就好了。

然后我们测试一下,在终端中输入 kid，会提示:
```shell
zsh: command not found: kid
```
为什么会这样呢？回想一下，通常我们在使用一个 cli 工具时，都需要先安装它，比如 vue-cli，使用前需要全局安装:
```shell
npm i vue-cli -g
```
而我们的 kid-cli 并没有发布到 npm 上，当然也没有安装过了，所以终端现在还不认识这个命令。通常我们想本地测试一个 npm 包，可以使用：`npm link` 这个命令，本地安装这个包，我们执行一下：
```shell
npm link
```
然后再执行
```shell
kid
```
命令，看正确输出 `hello world!` 了。
到此，一个简单的命令行工具就完成了，但是这个工具并没有任何卵用，别着急，我们来一点一点增强它的功能。

#### 查看版本信息
首先是查看 cli 的版本信息，希望通过如下命令来查看版本信息：
```shell
kid -v
```
这里有两个问题

1. 如何获取 `-v` 这参数？
2. 如何获取版本信息？

在 node 程序中，通过 `process.argv `可获取到命令的参数，以数组返回，修改 index.js，输出这个数组：
```js
console.log(process.argv)
```
然后输入任意命令，比如：
```shell
kid -v -h -lalala
```
控制台会输出
```shell
[ '/Users/shaolong/.nvm/versions/node/v8.9.0/bin/node',
  '/Users/shaolong/.nvm/versions/node/v8.9.0/bin/kid',
  '-v',
  '-h',
  '-lalala' ]
```
这个数组的第三个参数就是我们想要的 `-v`。
第二个问题，版本信息一般是放在package.json 文件的 version 字段中, require 进来就好了，改造后的 index.js 代码如下：
```js
#!/usr/bin/env node
const pkg = require('./package.json')
const command = process.argv[2]

switch (command) {
    case '-v':
    console.log(pkg.version)
    break
    default:
    break
}
```
然后我们再执行kid -v，就可以输出版本号了。

#### 初始化一个项目
接下来我们来实现一个最常见的功能，利用 cli 初始化一个项目。
整个流程大概是这样的：

1. `cd` 到一个你想新建项目的目录；
2. 执行 `kid init` 命令，根据提示输入项目名称；
3. cli 通过 git 拉取模版项目代码，并拷贝到项目名称所在目录中；

为了实现这个流程，我们需要解决下面几个问题：

##### 执行复杂的命令
上面的例子中，我们通过 process.argv 获取到了命令的参数，但是当一个命令有多个参数，或者像新建项目这种需要用户输入项目名称（我们称作“问答”）的命令时，一个简单的`swith case` 就显得捉襟见肘了。这里我们引用一个专门处理命令行交互的包： `commander` 。
```shell
npm i commander --save
```
然后改造index.js
```js
#!/usr/bin/env node

const program = require('commander')

program.version(require('./package.json').version)
program.parse(process.argv)
```
运行

```shell
kid -h
```

会输出

```shell
Usage: kid [options] [command]

Options:

  -V, --version  output the version number
  -h, --help     output usage information
```
commander已经为我们创建好了帮助信息，以及两个参数` -V`和 `-h`，上面代码中的program.version 就是返回版本号，和之前的功能一致，program.parse 是将命令参数传入commander 管道中，一般放在最后执行。
##### 添加问答操作
接下来我们添加 kid init 的问答操作，这里有需要引入一个新的包： `inquirer`, 这个包可以通过简单配置让 cli 支持问答交互。
```shell
npm i inquirer --save
```
index.js：
```js
#!/usr/bin/env node

const program = require('commander')
var inquirer = require('inquirer')

const initAction = () => {
    inquirer.prompt([{
        type: 'input',
        message: '请输入项目名称:',
        name: 'name'
    }]).then(answers => {
        console.log('项目名为：', answers.name)
        console.log('正在拷贝项目，请稍等')
    })
}

program.version(require('./package.json').version)

program
    .command('init')
    .description('创建项目')
    .action(initAction)

program.parse(process.argv)
```
program.command 可以定义一个命令，description 添加一个描述，在 `--help` 中展示，action 指定一个回调函数执行命令。inquirer.prompt 可以接收一组问答对象，type字段表示问答类型，name 指定答案的key，可以在 answers 里通过 name 拿到用户的输入，问答的类型有很多种，这里我们使用 input，让用户输入项目名称。
运行 kid init，然后会提示输入项目名称，输入后会打印出来。
##### 运行 shell 脚本
熟悉 git 和 linux 的同学几句话便可以初始化一个项目：
```shell
git clone xxxxx.git --depth=1
mv xxxxx my-project
rm -rf ./my-project/.git
cd my-project
npm i
```
那么如何在 node 中执行 shell 脚本呢？只需要安装 shelljs 这个包就可以轻松搞定。
```shell
npm i shelljs --save
```
假定我们想克隆 github 上 vue-admin-template 这个项目的代码，并自动安装依赖，改造index.js，在 initAction 函数中加上执行shell脚本的逻辑：
```js
#!/usr/bin/env node

const program = require('commander')
const inquirer = require('inquirer')
const shell = require('shelljs')

const initAction = () => {
    inquirer.prompt([{
        type: 'input',
        message: '请输入项目名称:',
        name: 'name'
    }]).then(answers => {
        console.log('项目名为：', answers.name)
        console.log('正在拷贝项目，请稍等')
        
        const remote = 'https://github.com/PanJiaChen/vue-admin-template.git'
        const curName = 'vue-admin-template'
        const tarName = answers.name

        shell.exec(`
                git clone ${remote} --depth=1
                mv ${curName} ${tarName}
                rm -rf ./${tarName}/.git
                cd ${tarName}
                npm i
              `, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`)
                return
            }
            console.log(`${stdout}`)
            console.log(`${stderr}`)
        });
    })
}

program.version(require('./package.json').version)

program
    .command('init')
    .description('创建项目')
    .action(initAction)

program.parse(process.argv)
```
shell.exec 可以帮助我们执行一段脚本，在回调函数中可以输出脚本执行的结果。
测试一下我们初始化功能：
```shell
cd ..
kid init
# 输入一个项目名称
```
可以看到，cli已经自动从github上拉取vue-admin-template的代码，放在指定目录，并帮我们自动安装了依赖。

##### 尾声
最后别忘了将你的 cli 工具发布到 npm 上，给更多的同学使用。
```shell
npm publish
```
