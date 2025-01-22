import Mock from 'mockjs'

// 模拟路由 /api/test
Mock.mock('/api/test', 'get', () => {
  return {
    errno: 0,
    data: {
      name: `xx ${Date.now()}`
    }
  }
})
