import axios from 'axios'
import { message } from 'antd'
import { config } from 'process'
import { getToken } from '../utils/user-token'
import { error } from 'console'

const instance = axios.create({
  timeout: 10 * 1000
})

export type ResType = {
  errno: number
  data?: ResDataType
  msg?: string
}

// request 拦截
instance.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = `Bearer ${getToken()}`
    return config
  },
  (error) => Promise.reject(error)
)

// response 拦截：统一处理 errno 和 msg
instance.interceptors.response.use((res) => {
  // 使用axios发送请求返回的数据都是双层data
  const resData = (res.data || {}) as ResType
  const { errno, data, msg } = resData

  if (errno !== 0) {
    // 错误提示
    if (msg) {
      message.error(msg)
    }
    throw new Error(msg)
  }

  // 如果没有as any就会报错，类型“(res: AxiosResponse<any, any>) => ResDataType | undefined”的参数不能赋给类型“(value: AxiosResponse<any, any>) => AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>”的参数。
  // 根据错误信息，axios 期望这个函数返回的是 AxiosResponse<any, any> 或者 Promise<AxiosResponse<any, any>>
  return data as any
})

export default instance

export type ResDataType = {
  [key: string]: any
}
