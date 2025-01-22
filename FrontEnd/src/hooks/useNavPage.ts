import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useGetUserInfo from './useGetUserInfo'
import {
  isLoginOrRegister,
  isNoNeedUserInfo,
  MANAGE_INDEX_PATHNAME,
  LOGIN_PATHNAME
} from '../router'

const useNavPage = (waitingUserData: boolean) => {
  const { username } = useGetUserInfo()
  const { pathname } = useLocation()
  const nav = useNavigate()
  useEffect(() => {
    if (waitingUserData) return
    // 已经拥有用户信息，却意图前往登录页或注册页，不允许，直接跳转到问卷页
    // if (username && isLoginOrRegister(pathname)) {
    //   nav(MANAGE_INDEX_PATHNAME)
    //   console.log(3)
    //   return
    // }
    if (username) {
      if (isLoginOrRegister(pathname)) {
        nav(MANAGE_INDEX_PATHNAME)
      }
      return
    }
    // 没有用户信息却意图前往需要用户信息的页面，不允许，直接跳转至登录页
    if (isNoNeedUserInfo(pathname)) {
      return
    } else {
      nav(LOGIN_PATHNAME)
    }
  }, [pathname, username, waitingUserData])
}

export default useNavPage
