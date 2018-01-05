const fs = require('fs')
const axios = require('axios')
const cheerio = require('cheerio')
// const puppeteer = require('puppeteer')
require('./mongo')
const mongoose = require('mongoose')
const Topic = require('./mongo/topic')

let url

async function getHtml (url) {
  return await axios({
    method: 'get',
    url,
    headers: {
      'accept-Language': 'zh-CN,zh;q=0.8',
      'Cookie': ''
    }
  })
    .then((response) => {
      return response.data
    })
}

console.log('开始向浏览器发起请求')
console.log('-----------------------')
for (let i = 0; i < 250; i += 25) {
  url = `https://www.douban.com/group/gz_rent/discussion?start=${i}`
  console.log(`请求到的第${i / 25 + 1}页数据`)
  getHtml(url)
    .then(async (html) => {
      let $ = cheerio.load(html)
      let tr = $('table.olt tbody tr').not('.th')
      await  tr.each(async (index, element) => {
        let title = $('td.title', element).text().trim()
        let url = $('td.title a', element).attr('href')
        let creator = $('td', element).eq(1).text()
        let replyNum = $('td', element).eq(2).text()
        let time = $('td', element).eq(3).text()
        let topic = {
          creator,
          title,
          url,
          replyNum,
          time
        }
        await Topic.createANewTopic(topic)
        fs.appendFile('./topics.txt',
          `${topic.title}   ${topic.url}  ${topic.time} \n`, function (err) {
            if (err) throw err
          })
      })
    })
}








