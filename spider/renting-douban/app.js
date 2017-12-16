const axios = require('axios')
const cheerio = require('cheerio')
// const puppeteer = require('puppeteer')
let topics = [
  // {
  //   title: null,
  //   user: null,
  //   time: null
  // }
]

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
  tr.each((index, element) => {
    let text = $('td', element).eq(0).text().trim()
    let user = $('td', element).eq(1).text()
    let reply = $('td', element).eq(2).text()
    let time = $('td', element).eq(3).text()
    let topic = {
      text,
      user,
      reply,
      time
    }
    topics.push(topic)
  })
}).then(() => {
  console.log(topics)
})



