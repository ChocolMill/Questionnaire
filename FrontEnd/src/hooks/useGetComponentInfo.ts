import { useSelector } from 'react-redux'
import { StateType } from '../store'
import {
  ComponentInfoType,
  ComponentsStateType
} from '../store/componentsReducer'

// 从 redux store 中获取组件列表
function useGetComponentInfo() {
  const components = useSelector<StateType>(
    (state) => state.components
  ) as ComponentsStateType

  const { componentList = [], selectedId, copiedComponent } = components

  const selectedComponent = componentList.find((c) => c.fe_id === selectedId)
  return { componentList, selectedId, selectedComponent, copiedComponent }
}

export default useGetComponentInfo
