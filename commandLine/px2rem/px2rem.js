#!/usr/bin/env node
const path = require('path')
const fs = require('fs')
let filename = process.argv[2]
let filePath = path.resolve(process.cwd(), filename)

let isCSS = !!filename.match(/.css\b/)
let isHTML = !!filename.match(/.html\b/)

try {
  let data = fs.readFileSync(filePath, 'utf-8')
  if (isCSS && !isHTML) {
    // 替换css文件
    let newData = data.replace(/\d+px\b/g, (match) => {
      let pxNum = match.slice(0, match.length - 2)
      let remNum = convert(pxNum)
      return `${remNum}rem`
    })
    fs.writeFileSync(filePath, newData)
  } else if (isHTML && !isCSS) {
    // 替换HTML文件的内联样式
    let newData = data.replace(/\d+px/g, (match) => {
      let pxNum = match.slice(0, match.length - 2)
      let remNum = convert(pxNum)
      return `${remNum}rem`
    })

    //检索HTML引用的外部样式并替换
    //先考虑匹配一个的情况
    data.match(/\<link.*\>/g).forEach((x) => {
      let cssHref = x.match(/href=".*"/)[0].slice(6, -1)
      let cssData = fs.readFileSync(cssHref, 'utf-8')
      let newCssData = cssData.replace(/\d+px/g, (match) => {
        let pxNum = match.slice(0, match.length - 2)
        let remNum = convert(pxNum)
        return `${remNum}rem`
      })
      console.log(cssHref)
      console.log(newCssData)
      // fs.writeFileSync(cssHref,newCssData)
      return
    })

    // let cssHref = linkTag.match(/href=".*"/)[0].slice(6,-1)
    // console.log(cssHref)
    // let cssData = fs.readFileSync(cssHref, 'utf-8')
    // let newCssData = cssData.replace(/\d+px/g, (match) => {
    //   let pxNum = match.slice(0, match.length - 2)
    //   let remNum = convert(pxNum)
    //   return `${remNum}rem`
    // })

    console.log(newData)
    // fs.writeFileSync(filePath, newData)
  } else {
    console.log('文件类型错误')
  }

} catch (error) {
  console.log('路径参数错误')
}

/*
*px数转化为rem数
* 默认1rem=20px
* */
function convert (pxNum) {
  let ratio = process.argv[3] ? process.argv[3] : 20
  return pxNum / ratio
}

// px2rem index.css 20
// px2rem index.html