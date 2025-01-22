import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Spin } from 'antd'
import useLoadUserData from '../hooks/useLoadUserData'
import useNavPage from '../hooks/useNavPage'

const QuestionLayout: FC = () => {
  const userLoading = useLoadUserData()
  useNavPage(userLoading)
  return (
    <>
      {/* <p>QuestionLayout</p> */}
      <div>
        {/* Outlet 相当于 Vue 中的 router-view */}
        {userLoading ? (
          <div
            style={{
              textAlign: 'center',
              marginTop: '400px'
            }}
          >
            <Spin />
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </>
  )
}

export default QuestionLayout
