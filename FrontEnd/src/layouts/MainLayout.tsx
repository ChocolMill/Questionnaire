import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout, Spin } from 'antd'
import Logo from '../components/Logo'
import UserInfo from '../components/UserInfo'
import styles from './MainLayout.module.scss'
import useLoadUserData from '../hooks/useLoadUserData'
import useNavPage from '../hooks/useNavPage'

const { Header, Footer, Content } = Layout

const MainLayout: FC = () => {
  const userLoading = useLoadUserData()
  useNavPage(userLoading)
  console.log('MainLayout')
  return (
    <Layout>
      {/* 上下结构 */}
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <UserInfo />
        </div>
      </Header>
      {/* 上 */}
      <Content className={styles.main}>
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
      </Content>
      <Footer className={styles.footer}>
        小象问卷 &copy; 2024 - present. Created by 肖翔
      </Footer>
      {/* 下 */}
    </Layout>
  )
}

export default MainLayout
