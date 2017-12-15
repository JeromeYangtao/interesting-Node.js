#!/usr/bin/env node
const path = require('path')
const fs = require('fs')
let filename = process.argv[2]
let filePath = path.resolve(process.cwd(), filename)

let isCSS = !!filename.match(/.css\b/)
let isHTML = !!filename.match(/.html\b/)

try {
  let data = fs.readFileSync(filePath, 'utf-8')

  function convert (pxNum) {
    // px数转化为rem数
    //默认1rem=20px
    let ratio = process.argv[3] ? process.argv[3] : 20
    console.log(`px:rem=${ratio}`)
    return pxNum / ratio
  }

  if (isCSS && !isHTML) {
    let newData = data.replace(/\d*px\b/, (match) => {
      let pxNum = match.slice(0, match.length - 2)
      let remNum = convert(pxNum)
      return `${remNum}rem`
    })
fs.writeFileSync(filePath, newData)
  } else if (isHTML && !isCSS) {
    /*TODO*/
  } else {
    console.log('文件类型错误')
  }

} catch (error) {
  console.log('路径参数错误')
}

