import React, { FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import EditCanvas from './EditCanvas'
import styles from './index.module.scss'
import { useDispatch } from 'react-redux'
import { changeSelectedId } from '../../../store/componentsReducer'
import EditHeader from './EditHeader'
import RightPanel from './RightPanel'
import LeftPanel from './LeftPanel'

const Edit: FC = () => {
  // useLoadQuestionData 是自定义hook 抽离公共逻辑
  const { loading } = useLoadQuestionData()

  const dispatch = useDispatch()
  function clearSelectedId() {
    dispatch(changeSelectedId(''))
  }

  return (
    <div className={styles.container}>
      <div style={{ backgroundColor: '#fff', height: '40px' }}>
        <EditHeader />
      </div>
      <div className={styles['content-wrapper']}>
        {/* 主体容器 */}
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel />
          </div>
          {/* 点击空白处取消选中 */}
          <div className={styles.main} onClick={clearSelectedId}>
            <div className={styles['canvas-wrapper']}>
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit
