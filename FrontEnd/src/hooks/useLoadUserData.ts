import { useEffect, useState } from 'react'
import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'
import useGetUserInfo from './useGetUserInfo'
import { getUserInfoService } from '../services/user'
import { loginReducer } from '../store/userReducer'

// 该钩子的作用是将请求得到的用户信息存放到redux store
function useLoadUserData() {
  const [waitingUserData, setWaitinUserData] = useState(true)
  const { username } = useGetUserInfo()
  const dispatch = useDispatch()
  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(res) {
      const { username, nickname } = res
      dispatch(loginReducer({ username, nickname })) // 存储到redux store
    },
    onFinally() {
      setWaitinUserData(false)
    }
  })
  useEffect(() => {
    if (username) {
      setWaitinUserData(false)
      return
    }
    run() // 如果redux store中没有用户信息，则请求用户信息
  }, [username])
  return waitingUserData
}

export default useLoadUserData
