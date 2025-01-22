import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import { LOGIN_PATHNAME } from '../router'
// import { useRequest } from 'ahooks'
// import { getUserInfoService } from '../services/user'
import { removeToken } from '../utils/user-token'
import useGetUserInfo from '../hooks/useGetUserInfo'
import { useDispatch } from 'react-redux'
import { loginReducer, logoutReducer } from '../store/userReducer'

const UserInfo: FC = () => {
  // const { data } = useRequest(async () => await getUserInfoService())
  // const { username, nickname } = data || {}

  const { username, nickname } = useGetUserInfo()

  const dispatch = useDispatch()

  const nav = useNavigate()

  function logout() {
    dispatch(logoutReducer())
    removeToken()
    message.success('退出成功')
    nav(LOGIN_PATHNAME)
  }

  // 登录后的用户信息结构
  const AfterLogin = (
    <>
      <span style={{ color: '#e8e8e8' }}>
        <UserOutlined />
        {nickname}
      </span>
      <Button type="link" onClick={logout}>
        退出
      </Button>
    </>
  )

  // 未登录的结构
  const BeforeLogin = <Link to={LOGIN_PATHNAME}>登录</Link>

  // 对于已经登录的用户显示用户信息
  return <>{username ? AfterLogin : BeforeLogin}</>
}

export default UserInfo
