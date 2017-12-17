const axios = require('axios')
const cheerio = require('cheerio')
// const puppeteer = require('puppeteer')
// const mongoose = require('./mongo')
require('./mongo')

const Topic = require('./mongo/topic')

async function getHtml () {
  return await axios({
    method: 'get',
    url: 'https://www.douban.com/group/gz_rent/discussion?start=0'
  })
    .then((response) => {
      return response.data
    })
}

getHtml().then((html) => {
  let $ = cheerio.load(html)
  let tr = $('table.olt tbody tr')
  tr.each(async (index, element) => {
    let title = $('td.title', element).text().trim()
    let url = $('td.title a', element).attr('href')
    let creator = $('td', element).eq(1).text()
    let replyNum = $('td', element).eq(2).text()
    let time = $('td', element).eq(3).text()
    await Topic.createANewTopic({
      creator,
      title,
      url,
      replyNum,
      time
    })
  })
})




