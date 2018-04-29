const fs = require('fs')
module.exports = function (source) {
  const options = loaderUtils.getOptions(this)  //webpack 提供的util
  const layoutHtml = fs.readFileSync(options.layout, 'utf-8')
  return layoutHtml.replace('{{__content__}}', source)
}
