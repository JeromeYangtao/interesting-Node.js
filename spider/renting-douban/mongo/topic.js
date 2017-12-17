const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.Promise = global.Promise

const TopicSchema = new Schema({
  creator: {type: String},
  title: {type: String},
  url: {type: String},
  time: {type: String},
  replyNum: {type: String}
})
const TopicModel = mongoose.model('topic', TopicSchema)

async function createANewTopic (params) {
  const topic = new TopicModel({
    creator: params.creator,
    title: params.title,
    url: params.url,
    time: params.time,
    replyNum: params.replyNum
  })
  return await topic.save()
    .catch(e => {
      console.log(e)
      throw new Error('MongoDB存储topic失败')
    })
}

async function getTopics (params = {page: 0, pageSize: 10}) {
  let flow = TopicModel.find({})
  flow.skip(params.page * params.pageSize)
  flow.limit(params.pageSize)
  return await flow
    .catch(e => {
      console.log(e)
      throw new Error('error getting users from db')
    })
}

async function getTopicById (topicId) {
  return TopicModel.findOne({_id: topicId})
    .catch(e => {
      console.log(e)
      throw Error(`error getting topic by id: ${topicId}`)
    })
}

module.exports = {
  model: TopicModel,
  createANewTopic,
  getTopics,
  getTopicById
}