import React, { FC } from 'react'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import {
  ComponentPropsType,
  getComponentConfByType
} from '../../../components/QuestionComponents'
import { useDispatch } from 'react-redux'
import { changeComponentProps } from '../../../store/componentsReducer'

const NoProp: FC = () => {
  return <div style={{ textAlign: 'center' }}>未选中组件</div>
}

const ComponentProp: FC = () => {
  const dispatch = useDispatch()

  // 获取redux store中当前选中的组件  componentInfoType 类型
  const { selectedComponent } = useGetComponentInfo()
  if (selectedComponent === undefined) return <NoProp />

  // 根据当前选中的组件的type找到组件的配置 componentConfType 类型
  const { type, props, isLocked, isHidden } = selectedComponent
  const componentConf = getComponentConfByType(type)
  if (componentConf === undefined) return <NoProp />

  // 所有右侧面板中属性组件的修改都由此函数处理
  function changeProps(newProps: ComponentPropsType) {
    if (selectedComponent === undefined) return
    const { fe_id } = selectedComponent
    dispatch(changeComponentProps({ fe_id, newProps }))
  }

  // 从组件的配置找到选中组件对应的右侧面板
  const { PropComponent } = componentConf

  return (
    <PropComponent
      {...props}
      onChange={changeProps}
      disabled={isLocked || isHidden} // 此处的 isHidden 用于兜底的情况，可以不加
    />
  )
}

export default ComponentProp
