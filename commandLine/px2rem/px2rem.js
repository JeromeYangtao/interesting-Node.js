#!/usr/bin/env node
const path = require('path')
const fs = require('fs')
let filename = process.argv[2]
let filePath = path.resolve(process.cwd(), filename)


let data = fs.readFileSync(filePath, 'utf-8');

let string = data.replace(/px/i,'rem')
console.log(string)
// 用法
// px2rem index.css