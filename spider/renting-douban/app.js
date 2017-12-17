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
    url
  })
    .then((response) => {
      return response.data
    })
}

for (let i = 0; i < 2500; i += 25) {
  url = `https://www.douban.com/group/gz_rent/discussion?start=${i}`
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








