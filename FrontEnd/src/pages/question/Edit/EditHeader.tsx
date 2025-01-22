import React, { FC } from 'react'
import styles from './EditHeader.module.scss'
import { Button, Typography, Space, Input, message } from 'antd'
import { LeftOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import EditToolbar from './EditToolBar'

const EditHeader: FC = () => {
  const nav = useNavigate()

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            {/* <TitleElem /> */}
          </Space>
        </div>

        <div className={styles.main}>
          <EditToolbar />
        </div>

        <div className={styles.right}>
          <Space>
            {/* <SaveButton /> */}
            {/* <PublishButton /> */}
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader
