import React, { FC, useEffect, useState } from 'react'
import { Space, Typography } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import styles from './Logo.module.scss'
import useGetUserInfo from '../hooks/useGetUserInfo'
import { HOME_PATHNAME, MANAGE_INDEX_PATHNAME } from '../router'

const { Title } = Typography

const Logo: FC = () => {
  const [pathName, setPathName] = useState('')
  const { username } = useGetUserInfo()
  useEffect(() => {
    username ? setPathName(MANAGE_INDEX_PATHNAME) : setPathName(HOME_PATHNAME)
  }, [username])
  return (
    <div className={styles.container}>
      <Link to={pathName}>
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>小象问卷</Title>
        </Space>
      </Link>
    </div>
  )
}

export default Logo
