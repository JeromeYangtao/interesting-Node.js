#!/usr/bin/env node
const path = require('path')
const fs = require('fs')
let filename = process.argv[2]
let filePath = path.resolve(process.cwd(), filename)

let data = fs.readFileSync(filePath, 'utf-8')

function convert (pxNum) {
  // px数转化为rem数
  //假设1rem=10px
  return pxNum / 10
}

let newData = data.replace(/\d*px\b/, (match) => {
  let pxNum = match.slice(0, match.length - 2)
  let remNum = convert(pxNum)
  return `${remNum}rem`
})

fs.writeFileSync(filePath, newData)
console.log(newData)

// 用法
// px2rem index.css