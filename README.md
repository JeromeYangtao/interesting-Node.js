# interesting-Node.js
用Node.js实现一些有意思的东西

### 已经实现的功能
- [x] 代理服务器
- [x] hello脚本

### 项目目录说明
```
.
|-- commandLine                       // 一些常见的命令行
|   |-- hello                         // 最简单的hello脚本
|-- proxy                             // 代理服务器
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
```