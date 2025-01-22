import React, { FC, useState } from 'react'
import { useRequest, useTitle } from 'ahooks'
import {
  Typography,
  Empty,
  Table,
  Tag,
  Space,
  Button,
  Modal,
  message,
  Spin
} from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import ListSearch from '../../components/ListSearch'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import ListPage from '../../components/ListPage'
import {
  updateQuestionService,
  deleteQuestionService
} from '../../services/question'
import styles from './common.module.scss'

const { Title } = Typography
const { confirm } = Modal

const Trash: FC = () => {
  useTitle('小象问卷 - 回收站')
  const {
    data = {},
    loading,
    refresh
  } = useLoadQuestionListData({ isDeleted: true })
  const { list = [], total } = data
  // 记录选中的id
  const [selectedIds, setSelectedIds] = useState<string[]>([]) // 类型错误解决方法

  // 恢复
  const { loading: recoverLoading, run: recover } = useRequest(
    async () => {
      for (const id of selectedIds) {
        await updateQuestionService(id, { isDeleted: true })
      }
    },
    {
      manual: true,
      debounceWait: 500,
      onSuccess() {
        refresh()
        setSelectedIds([])
        message.success('已恢复')
      }
    }
  )

  // 彻底删除
  const { run: deleteQuestion } = useRequest(
    async () => {
      await deleteQuestionService(selectedIds)
    },
    {
      manual: true,
      onSuccess() {
        refresh()
        setSelectedIds([])
        message.success('删除成功')
      }
    }
  )

  console.log('recoverLoading:', recoverLoading)
  // console.log('selectedIds.length === 0 ?', selectedIds.length === 0)
  // console.log('selectedIds.length:', selectedIds.length)

  const tableColumn = [
    {
      title: '标题',
      dataIndex: 'title'
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      render: (isPublished: boolean) => {
        return isPublished ? (
          <Tag color="processing">已发布</Tag>
        ) : (
          <Tag>未发布</Tag>
        )
      }
    },
    {
      title: '回答数量',
      dataIndex: 'answerCount'
    },
    {
      title: '创建时间',
      dataIndex: 'createAt'
    }
  ]

  function del() {
    confirm({
      title: '确定彻底删除该问卷吗？',
      icon: <ExclamationCircleOutlined />,
      content: '删除以后不可找回。',
      onOk: deleteQuestion
    })
  }

  const TableElem = (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Space>
          {/* 没有选择数据，应该禁用恢复按钮 */}
          <Button
            type="primary"
            disabled={selectedIds.length === 0}
            onClick={recover}
          >
            恢复
          </Button>
          <Button danger onClick={del} disabled={selectedIds.length === 0}>
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={list}
        columns={tableColumn}
        pagination={false}
        rowKey={(q: any) => {
          return q._id
        }}
        rowSelection={{
          type: 'checkbox',
          onChange: (selectRowKeys) => {
            // console.log('selectRowKeys', selectRowKeys)
            setSelectedIds(selectRowKeys as string[]) // 类型错误解决方法
          }
        }}
      />
    </>
  )

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
        {list.length > 0 && TableElem}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  )
}

export default Trash
