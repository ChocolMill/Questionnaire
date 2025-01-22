const Koa = require('koa')
const Router = require('koa-router')
const mockList = require('./mock/index')

const app = new Koa()
const router = new Router()

function getRes(fn, ctx) {
  return new Promise(resolve => {
    setTimeout(() => {
      const res = fn(ctx)
      resolve(res)
    }, 500)
  })
}

// 注册 mock 路由
mockList.forEach((item) => {
  const { url, method, response } = item
  router[method](url, async ctx => {
      // const res = response()
      // 因为 JavaScript 函数的参数是松散类型的，这意味着函数可以接受比定义时更多的参数，这些额外的参数会被简单地忽略。
      // 具体来说，JavaScript 函数的参数是按值传递的，如果传递的参数比函数定义的多，那么超出的参数会被忽略，不会引发错误。
      // 相反，如果传递的参数比定义的少，那么未提供的参数的值将是 undefined。
      const res = await getRes(response, ctx)    // 模拟网络请求的加载状态
      ctx.body = res
  })
})

app.use(router.routes())
app.listen(3001) // port 端口 不要和react应用端口冲突
