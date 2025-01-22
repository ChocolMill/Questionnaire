/**
 * @description 生成问卷列表
 * @author 肖翔
 */

const Mock = require('mockjs')
const Random = Mock.Random

function getQuestionList(opt = {}){
  const { len = 10, isDeleted = false, isStar } = opt
  const list = []
  for(let i = 0; i < len; i++){
    list.push({
      _id: Random.id(),
      title: Random.ctitle(),
      isPublished: Random.boolean(),
      isStar: isStar == undefined ? Random.boolean() : true,
      answerCount: Random.natural(50, 100),
      createAt: Random.datetime(),
      isDeleted,  // 假删除
    })
  }
  return list
}

module.exports = getQuestionList
