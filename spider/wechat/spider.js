const fs = require('fs')
const puppeteer = require('puppeteer')
let data = require('./data')
let urls = []
for (let res of data) {
  let general_msg_list = JSON.parse(res.general_msg_list)
  let list = general_msg_list.list
  list.map((node) => {
    let url = node.app_msg_ext_info.content_url
    urls.push(url)
  })
}
// console.log(urls.length)
;(async () => {
  const browser = await puppeteer.launch({
    headless: false
  })
  const page = await browser.newPage()
  for (let i = 0; i < urls.length; i++) {
    // 打开网页
    await page.goto(urls[i])
    await page.waitForSelector('#img-content')

    const article = await page.evaluate(() => {
      const $els = document.querySelector('#img-content')
      return $els.innerText
    })
    fs.appendFileSync('articles.txt', article)
    page.waitFor(500)
    // await browser.close()
  }
})()



