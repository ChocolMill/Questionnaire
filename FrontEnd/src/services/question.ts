import axios, { ResDataType } from './ajax'
// axios 是 ./ajax 中的 instance 即 axios 的实例
// import type { ResDataType } from './ajax' 获取类型的第二种方式

// 我的问卷、星标问卷和回收站都需要获取问卷，
// 只是我的问卷获取的是所有问卷和有查询关键词的问卷
// 而星标问卷获取的是被isStart标记的问卷
// 回收站获取的是被isDeleted标记的问卷
type SearchOption = {
  keyword: string
  isStar: boolean
  isDeleted: boolean
  page: number // 告诉服务端当前为第几页
  pageSize: number // 告诉服务端当前页有多少条数据
}

// 获取单个问卷信息
// 使用axios.get(url) 和 axios({url, method: 'get'}) 的效果是一样的
export function getQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/question/${id}`
  return axios.get(url)
}

// 创建问卷
export function createQuestionService(): Promise<ResDataType> {
  const url = '/api/question'
  return axios.post(url)
}

// 获取（查询）问卷列表
export function getQuestionListService(
  opt: Partial<SearchOption> = {}
): Promise<ResDataType> {
  const url = '/api/question'
  return axios.get(url, { params: opt })
}

// 更新单个问卷
export function updateQuestionService(
  id: string,
  opt: { [key: string]: any }
): Promise<ResDataType> {
  const url = `/api/question/${id}`
  return axios.patch(url, opt)
}

// 复制问卷
export function duplicateQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/question/duplicate/${id}`
  return axios.post(url)
}

// 批量彻底删除
export function deleteQuestionService(idList: string[]): Promise<ResDataType> {
  const url = '/api/question/'
  return axios.delete(url, { data: { idList } })
}
