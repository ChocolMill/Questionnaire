import React, { FC, MouseEvent } from 'react'
import { Spin } from 'antd'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import {
  ComponentConfType,
  getComponentConfByType
} from '../../../components/QuestionComponents'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import {
  changeSelectedId,
  ComponentInfoType
} from '../../../store/componentsReducer'
import useCanvasShortcutKey from '../../../hooks/useCanvasShortcutKey'
import styles from './EditCanvas.module.scss'

// 临时展示
// import QuestionInput from '../../../components/QuestionComponents/QuestionInput/Component'
// import QuestionTitle from '../../../components/QuestionComponents/QuestionTitle/Component'

type PropsType = {
  loading: boolean
}

function genComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo

  const componentConf = getComponentConfByType(type) as ComponentConfType
  if (componentConf === null) {
    console.log('return null')
    return null
  }

  const { Component } = componentConf
  return <Component {...props} />
}

const EditCanvas: FC<PropsType> = ({ loading }) => {
  const { componentList, selectedId } = useGetComponentInfo()
  // console.log('EditCanvas_componentList: ', componentList)

  const dispatch = useDispatch()
  function handleClick(event: MouseEvent, id: string) {
    // 阻止冒泡。在EditCanvas的父组件中实现了“点击空白处取消选中”的功能
    // 即在EditCanvas的父组件中出发点击事件会清空selectedId
    // 如果不阻止冒泡，会导致选中组件后蓝色边框未出现的情况
    // 这是因为点击组件的事件冒泡到EditCanvas的父组件的点击清空selectedId事件
    event.stopPropagation()
    dispatch(changeSelectedId(id))
  }

  // 绑定快捷键
  useCanvasShortcutKey()

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Spin />
      </div>
    )
  }

  return (
    <div className={styles.canvas}>
      {componentList
        .filter((c) => !c.isHidden) // 只返回没有被隐藏的组件
        .map((c) => {
          const { fe_id, isLocked } = c

          // 使用第三方库 classNames 拼接 classname
          const wrapperDefaultClassName = styles['component-wrapper']
          const selectedClassName = styles.selected
          const lockedClassName = styles.locked
          const wrapperClassName = classNames({
            [wrapperDefaultClassName]: true,
            [selectedClassName]: selectedId === fe_id,
            [lockedClassName]: isLocked
          })

          return (
            <div
              key={fe_id}
              className={wrapperClassName}
              onClick={(e) => {
                handleClick(e, fe_id)
              }}
            >
              <div className={styles.component}>{genComponent(c)}</div>
            </div>
          )
        })}
      {/* <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionTitle />
        </div>
      </div>

      <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionInput />
        </div>
      </div> */}
    </div>
  )
}

export default EditCanvas
