# interesting-Node.js
用Node.js实现一些有意思的东西

### 已经实现的功能
- [x] 代理服务器
- [x] hello脚本
- [x] 有道翻译脚本
- [x] 批量px转rem脚本

### 项目目录说明
```
.
|-- commandLine                       // 一些常见的命令行
|   |-- hello                         // 最简单的hello脚本
|   |-- node-translator               // 有道翻译脚本
|   |-- px2rem                        // 批量px转rem脚本
|-- proxy                             // 代理服务器
|-- spider                            // 爬虫
|   |-- renting-douban                //爬取豆瓣的租房信息
|-- .gitignore                        // git忽略的代码
|-- README.md                         // 项目说明

.
```

### 使用说明
安装
```
1.安装Node.js
2.克隆项目:git clone https://github.com/JeromeYangtao/interesting-Node.js.git
3.cd commandLine
4.npm install
5.进入想要使用的命令行工具文件夹
6.npm link
7.使用命令行
```

命令行具体使用
```
命令行工具:hello

在终端输入:hello
输出:hello world
在终端输入:hello --name=Thomson 或者 hello -n=Thomson
输出:hello Thomson
在终端输入:hello --help  或者 hello -h
输出:帮助信息

有道翻译脚本:node-translator
在终端输入:youdao home
输出: home 的翻译

批量px转rem脚本
在终端输入:px2rem index.css 20 (20为rem和px的比值,默认是20)
或者
在终端输入:px2rem index.html
在终端输入:px2rem (处理当前文件夹下的文件)
```