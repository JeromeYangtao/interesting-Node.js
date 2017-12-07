#!/usr/bin/env node

const request = require('request')
const colors = require('colors')
let param = process.argv[2]
let word = param ? param : ''
request('http://fanyi.youdao.com/openapi.do?keyfrom=node-translator&key=2058911035&type=data&doctype=json&version=1.1&q=' + word, function (error, response, body) {
  if (!error && response.statusCode === 200) {
    console.log(body);
  }
});
