#!/usr/bin/env node
const path = require('path')
const fs = require('fs')
let filename = process.argv[2]
let filePath = path.resolve(process.cwd(), filename)

let data = fs.readFileSync(filePath, 'utf-8')

function convert (pxNum) {
  // px数转化为rem数
  //默认1rem=20px
  let ratio = process.argv[3] ? process.argv[3] : 20
  console.log(`px:rem=${ratio}`)
  return pxNum / ratio
}

let newData = data.replace(/\d*px\b/, (match) => {
  let pxNum = match.slice(0, match.length - 2)
  let remNum = convert(pxNum)
  return `${remNum}rem`
})

fs.writeFileSync(filePath, newData)

// 用法
// px2rem index.css 20