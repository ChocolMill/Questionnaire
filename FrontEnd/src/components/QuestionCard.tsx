import React, { FC, useState } from 'react'
import { Button, Space, Divider, Tag, Popconfirm, Modal, message } from 'antd'
import {
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons'
import { useNavigate, Link } from 'react-router-dom'
import {
  updateQuestionService,
  duplicateQuestionService
} from '../services/question'
import styles from './QuestionCard.module.scss'
import { useRequest } from 'ahooks'

type PropsType = {
  _id: string
  title: string
  isStar: boolean
  isPublished: boolean
  answerCount: number
  createAt: string
}

const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const nav = useNavigate()
  const { _id, title, createAt, answerCount, isPublished, isStar } = props

  const { confirm } = Modal

  // 修改标星
  const [isStarState, setIsStartState] = useState(isStar)
  const { loading: changeStarLoading, run: changeStar } = useRequest(
    async () => {
      await updateQuestionService(_id, { isStar: !isStarState })
    },
    {
      manual: true,
      onSuccess() {
        setIsStartState(!isStarState)
        if (!isStarState) message.success('已标星')
        else message.success('已取消标星')
      }
    }
  )

  // function duplicate() {
  //   message.success('复制成功！')
  // }

  // 复制
  const { loading: duplicateLoading, run: duplicate } = useRequest(
    async () => {
      return await duplicateQuestionService(_id)
    },
    {
      manual: true,
      onSuccess(res) {
        // console.log(res)
        message.success('复制成功！')
        // 复制成功后要跳转到复制后得到的问卷页面 其实也就是创建问卷后要跳转到的页面
        nav(`/question/edit/${res.id}`)
      }
    }
  )

  // 删除 使用更新问卷的api，因为是假删除，只需修改isDeleted
  const [isDeleteState, setIsDeleteState] = useState(false)
  const { loading: deleteLoading, run: deleteQuestion } = useRequest(
    async () => {
      await updateQuestionService(_id, { isDeleted: true })
    },
    {
      manual: true,
      onSuccess() {
        message.success('删除成功')
        setIsDeleteState(true)
      }
    }
  )

  // 已经删除的问卷，无需再渲染卡片，因此无需返回卡片，而是返回null
  if (isDeleteState) return null

  function del() {
    confirm({
      title: '确定删除该问卷？',
      icon: <ExclamationCircleOutlined />,
      onOk: deleteQuestion
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link
            to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}
          >
            <Space>
              {isStarState && <StarOutlined style={{ color: 'red' }} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublished ? (
              <Tag color="processing">已发布</Tag>
            ) : (
              <Tag>未发布</Tag>
            )}
            <span>答卷：{answerCount}</span>
            <span>{createAt}</span>
          </Space>
        </div>
      </div>

      {/* 由于拥有不同的上级，因此即使有两个styles.left也不会冲突 */}

      <Divider style={{ margin: '12px 0' }} />

      <div className={styles['button-container']}>
        <div className={styles.left}>
          <Space>
            <Button
              icon={<EditOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/edit/${_id}`)}
            >
              编辑问卷
            </Button>
            <Button
              icon={<LineChartOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/stat/${_id}`)}
              disabled={!isPublished}
            >
              问卷统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            {/* 如果处于标星等待状态，则禁用按钮，防止用户重复点击，并且提高用户体验感 */}
            <Button
              type="text"
              icon={<StarOutlined />}
              size="small"
              onClick={changeStar}
              disabled={changeStarLoading}
            >
              {isStarState ? '取消标星' : '标星'}
            </Button>
            <Popconfirm
              title="确定复制该问卷？"
              okText="确定"
              cancelText="取消"
              onConfirm={duplicate}
              disabled={duplicateLoading}
            >
              <Button type="text" icon={<CopyOutlined />} size="small">
                复制
              </Button>
            </Popconfirm>
            <Button
              type="text"
              icon={<DeleteOutlined />}
              size="small"
              onClick={del}
              disabled={deleteLoading}
            >
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
