const fs = require('fs')
const axios = require('axios')
const cheerio = require('cheerio')
// const puppeteer = require('puppeteer')
const CronJob = require('cron').CronJob

// require('./mongo')
// const Topic = require('./mongo/topic')

let url
let topicArr = []

/**
 *根据URL获取html
 *
 * @param {string} url
 */
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

/**
 *包含对象的数组去重
 *
 * @param {array} arr 要去重的数组
 * @param {string} key 去重的索引
 */

function unique (arr, key) {
  let result = {}
  let finalResult = []
  for (let i = 0; i < arr.length; i++) {
    result[arr[i][key]] = arr[i]
  }
  for (let item in result) {
    finalResult.push(result[item])
  }
  return finalResult
}

console.log('开始向浏览器发起请求')
console.log('-----------------------')

let i = 0
new CronJob('* * * * * *', function () {
  console.log('一秒钟请求一次')

  url = `https://www.douban.com/group//HZhome/discussion?start=${i}`
  console.log(i)
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
        topicArr.push(topic)
      })
      topicArr = unique(topicArr, 'url')
      topicArr.forEach(async (topic) => {
        // await Topic.createANewTopic(topic)
        fs.appendFile('./topics.txt',
          `${topic.title}   ${topic.url}  ${topic.time} \n`, function (err) {
            if (err) throw err
          })
      })
    })
    .catch((err) => {
      console.log(err)
      console.log('网络请求失败')
    })
  i += 25
}, null, true, 'America/Los_Angeles')













