#!/usr/bin/env node
const path = require('path')
const fs = require('fs')
let filename = process.argv[2]

if (filename) {
  // 处理具体文件
  let filePath = path.resolve(process.cwd(), filename)
  let isCSS = !!filename.match(/.css\b/)
  let isHTML = !!filename.match(/.html\b/)

  try {
    let data = fs.readFileSync(filePath, 'utf-8')
    console.log(data)
    if (isCSS && !isHTML) {
      // 替换css文件
      let newData = getReplacedData(data)
      console.log(newData)
      // fs.writeFileSync(filePath, newData)
    } else if (isHTML && !isCSS) {
      // 替换HTML文件的内联样式
      let newData = getReplacedData(data)
      //检索HTML引用的外部样式并替换
      data.match(/<link.*>/g).forEach((x) => {
        let cssHref = x.match(/href=".*"/)[0].slice(6, -1)
        let cssData = fs.readFileSync(cssHref, 'utf-8')
        let newCssData = getReplacedData(cssData)
        console.log(newCssData)
        // fs.writeFileSync(cssHref,newCssData)
      })
      console.log(newData)
      // fs.writeFileSync(filePath, newData)
    } else {
      console.log('文件类型错误')
    }
  } catch (error) {
    console.log('路径参数错误')
  }
} else {
  //处理文件夹
  let filePaths = getFiles(process.cwd())
  filePaths.forEach((filePath) => {
    let data = fs.readFileSync(filePath, 'utf-8')
    let newData = getReplacedData(data)
    console.log(newData)
    // fs.writeFileSync(filePath,newData)
  })
}

/*
*px数转化为rem数
* 默认1rem=20px
* */
function convert (pxNum) {
  let ratio = process.argv[3] ? process.argv[3] : 20
  return pxNum / ratio
}

/*
*把文本内的px转化为rem
* */
function getReplacedData (data) {
  return data.replace(/\d+px/g, (match) => {
    let pxNum = match.slice(0, match.length - 2)
    let remNum = convert(pxNum)
    return `${remNum}rem`
  })
}

// 根据是否存在 . 简单判断是否为文件夹
function isFile (file) {
  return file.includes('.')
}

function isDir (file) {
  return !file.includes('.')
}

// 获取文件夹下的所有文件
function getFiles (dirname) {
  let _filePaths = []

  function _recursive (currentDir) {
    let currentFiles = fs.readdirSync(currentDir)
    let currentFilePaths = currentFiles.filter(isFile).map((file) => {
      return path.resolve(currentDir, file)
    })
    _filePaths = _filePaths.concat(currentFilePaths)
    // 处理文件夹下的文件夹
    let dirPaths = currentFiles.filter(isDir).map((dir) => {
      return path.resolve(currentDir, dir)
    })
    if (dirPaths.length > 0) {
      dirPaths.forEach((dirPath) => {
        _recursive(dirPath)
      })
    } else {
      //退出递归
      return null
    }
  }

  _recursive(dirname)
  return _filePaths
}

// px2rem index.css 20
// px2rem index.html
//px2rem