const Mock = require('mockjs')
const getQuestionList = require('./data/getQuestionList')
const { url } = require('koa-router')

const Random = Mock.Random

module.exports = [
  {
    // 获取单个问卷信息
    url: '/api/question/:id',
    method: 'get',
    response() {
      return {
        errno: 0,
        data: {
          id: Random.id(),
          title: Random.ctitle(),
          // 进入编辑页面后该api会被调用，要返回一个组件列表，好让编辑页面知道在画布中展示什么组件
          componentList: [
            // Info
            {
              fe_id: Random.id(),
              type: 'questionInfo',  // 不同组件，类型不可重复，需前后端商量
              title: '问卷信息',
              isHidden: false,  // 工具栏功能，是否隐藏
              isLocked: false,  // 工具栏功能，是否锁定
              props: {title: '问卷标题', desc: '问卷描述'}
            },
            // Title
            {
              fe_id: Random.id(),
              type: 'questionTitle',  // 不同组件，类型不可重复，需前后端商量
              title: '标题',
              isHidden: false,  // 工具栏功能，是否隐藏
              isLocked: false,  // 工具栏功能，是否锁定
              props: {text: '个人信息调研', level: 1, isCenter: false}
            },
            // Input
            {
              fe_id: Random.id(),
              type: 'questionInput',
              title: '输入框',
              isHidden: false,  // 工具栏功能，是否隐藏
              isLocked: false,  // 工具栏功能，是否锁定
              props: {title: '你的姓名', placeholder: '请输入姓名'}
            },
            // Input
            {
              fe_id: Random.id(),
              type: 'questionInput',
              title: '输入框2',
              isHidden: false,  // 工具栏功能，是否隐藏
              isLocked: false,  // 工具栏功能，是否锁定
              props: {title: '你的电话', placeholder: '请输入电话'}
            },
            // Textarea
            {
              fe_id: Random.id(),
              type: 'questionTextarea',
              title: '多行输入',
              isHidden: false,  // 工具栏功能，是否隐藏
              isLocked: false,  // 工具栏功能，是否锁定
              props: {title: '你的爱好', placeholder: '请输入...'}
            },
            // Paragraph
            {
              fe_id: Random.id(),
              type: 'questionParagraph',
              title: '段落',
              isHidden: false,  // 工具栏功能，是否隐藏
              isLocked: false,  // 工具栏功能，是否锁定
              props: {text: '一行段落', isCenter: false}
            },
            // Radio
            {
              fe_id: Random.id(),
              type: 'questionRadio',
              title: '单选',
              isHidden: false,  // 工具栏功能，是否隐藏
              isLocked: false,  // 工具栏功能，是否锁定
              props: {
                title: '单选标题',
                isVertical: false,
                options: [
                  // value 不能重复
                  { value: 'item1', text: '选项1' },
                  { value: 'item2', text: '选项2' },
                  { value: 'item3', text: '选项3' }
                ],
                value: ''
              }
            }
          ]
        }
        // errno: 1002,
        // msg: '错误测试'
      }
    }
  },
  // 创建问卷
  {
    url: '/api/question',
    method: 'post',
    response() {
      return {
        errno: 0,
        data: {
          id: Random.id()
        }
      }
    }
  },
  // 获取（查询）问卷列表
  {
    url: '/api/question',
    method: 'get',
    response(ctx) {
      const { url = '', query = {} } = ctx
      const isDeleted = url.indexOf('isDeleted=true') >= 0
      const isStar = url.indexOf('isStar=true') >= 0 || undefined
      const pageSize = parseInt(query.pageSize) || 10

      return {
        errno: 0,
        data: {
          list: getQuestionList({len: pageSize, isDeleted, isStar}), // 当前页
          total: 100 // 总数
        }
      }
    }
  },
  // 更新问卷
  // 只是一个模拟成功后的结果，因此无需返回随机数据或真实的数据
  {
    url: '/api/question/:id',
    method: 'patch',
    response(){
      return{
        errno: 0
      }
    }
  },
  // 复制问卷
  {
    url: '/api/question/duplicate/:id',
    method: 'post',
    response() {
      return {
        errno: 0,
        data: {
          id: Random.id()
        }
      }
    }
  },
  // 批量彻底删除
  {
    url: '/api/question',
    method: 'delete',
    response() {
      return {
        errno: 0
      }
    }
  }
]