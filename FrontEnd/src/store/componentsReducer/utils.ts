import { ComponentInfoType, ComponentsStateType } from './index'

/**
 * 获取下一个 selectedId 删除后选中组件
 * @param fe_id 当前的 id
 * @param componentList 组件列表
 */
export function getNextSelectedId(
  fe_id: string,
  componentList: ComponentInfoType[]
) {
  // 在隐藏/删除组件后，应该在没有被隐藏的组件中选中下一个组件
  const visibleComponentList = componentList.filter((c) => !c.isHidden)
  const index = visibleComponentList.findIndex((c) => c.fe_id === fe_id)
  if (index < 0) return ''

  // 重新计算 selectedId
  let newSelectedId = ''
  const length = visibleComponentList.length
  if (length <= 1) {
    // 组件长度就一个，被删除了，就没有组件
    newSelectedId = ''
  } else {
    // 组件长度 > 1
    if (index + 1 === length) {
      // 要删除的组件是最后一个，那么删除该组件后就要选中上一个组件
      newSelectedId = visibleComponentList[index - 1].fe_id
    } else {
      // 要删除的不是最后一个，删除以后，选中下一个
      newSelectedId = visibleComponentList[index + 1].fe_id
    }
  }

  return newSelectedId
}

/**
 * 插入新组件
 * @param draft state draft
 * @param newComponent 新组件
 */
export function insertNewComponent(
  draft: ComponentsStateType,
  newComponent: ComponentInfoType
) {
  const { selectedId, componentList } = draft
  const index = componentList.findIndex((c) => c.fe_id === selectedId)

  if (index < 0) {
    // 未选中任何组件
    draft.componentList.push(newComponent)
  } else {
    // 选中了组件，插入到 index 后面
    draft.componentList.splice(index + 1, 0, newComponent)
  }

  draft.selectedId = newComponent.fe_id
}
