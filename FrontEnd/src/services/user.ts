import axios, { ResDataType } from './ajax'

// 获取用户信息
export function getUserInfoService(): Promise<ResDataType> {
  const url = '/api/user/info'
  return axios.get(url)
}

// 注册用户
// 注册用户时nickname可选
export function registerService(
  username: string,
  password: string,
  nickname?: string
): Promise<ResDataType> {
  const url = '/api/user/register'
  const body = { username, password, nickname: nickname || username }
  return axios.post(url, body)
}

// 登录
export function loginService(
  username: string,
  password: string
): Promise<ResDataType> {
  const url = '/api/user/login'
  const body = { username, password }
  return axios.post(url, body)
}
