#!/usr/bin/env node
const path = require('path')
const fs = require('fs')
let filename = process.argv[2]
let filePath = path.resolve(process.cwd(), filename)

let data = fs.readFileSync(filePath, 'utf-8')

//假设1rem=10px
let string = data.replace(/\d*px\b/, (match) => {
  let pxNum = match.slice(0, match.length - 2)
  let remNum = pxNum / 10
  return `${remNum}rem`
})

// function convert(str, p1, offset, s)
// {
//   return ((p1-32) * 5/9) + "C";
// }
// var test = /(\d+(?:\.\d*)?)F\b/g;
// return s.replace(test, convert);

console.log(string)
// 用法
// px2rem index.css