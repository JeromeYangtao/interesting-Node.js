#!/usr/bin/env node

const request = require('request')
let param = process.argv[2]
let word = param ? param : ''
request('http://fanyi.youdao.com/openapi.do?keyfrom=node-translator&key=2058911035&type=data&doctype=json&version=1.1&q=' + word, function (error, response, body) {
  if (!error && response.statusCode === 200) {
    JSON.parse(body).basic.explains.forEach((para) => {
      console.log(para)
    })
  }
})
