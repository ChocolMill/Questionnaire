import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { produce } from 'immer'
import cloneDeep from 'lodash.clonedeep'
import { nanoid } from 'nanoid'
import { ComponentPropsType } from '../../components/QuestionComponents'
import { getNextSelectedId, insertNewComponent } from './utils'

export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  isHidden?: boolean
  isLocked?: boolean
  props: ComponentPropsType
}

export type ComponentsStateType = {
  selectedId: string
  componentList: Array<ComponentInfoType>
  copiedComponent: ComponentInfoType | null
}

const INIT_STATE: ComponentsStateType = {
  selectedId: '',
  componentList: [],
  copiedComponent: null
}

export const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    // 重置所有组件
    resetComponents(
      state: ComponentsStateType,
      action: PayloadAction<ComponentsStateType>
    ) {
      // 返回新的 state，不可以修改 state
      return action.payload
    },

    // 修改 selecteId
    // changeSelectedId(
    //   state: ComponentsStateType,
    //   action: PayloadAction<string>
    // ) {
    //   const selectedId = action.payload
    //   return { ...state, selectedId }
    // }

    // 通过immer改变不可变数据的写法
    changeSelectedId: produce(
      (draft: ComponentsStateType, action: PayloadAction<string>) => {
        draft.selectedId = action.payload
      }
    ),

    // 添加新组件，如果未选中画布中的组件则默认将组件添加到最后
    // 如果选中了画布中的组件，则将需添加的组件添加到选中的组件的后面
    addComponent: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<ComponentInfoType>
      ) => {
        const newComponent = action.payload
        insertNewComponent(draft, newComponent)
      }
    ),

    // 修改组件属性
    changeComponentProps: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
      ) => {
        const { fe_id, newProps } = action.payload

        // 找到要修改属性的组件
        const curComp = draft.componentList.find((c) => c.fe_id === fe_id)

        if (curComp) {
          curComp.props = {
            ...curComp.props,
            ...newProps
          }
        }
      }
    ),

    // 工具栏：删除选中的组件
    removeSelectedComponent: produce((draft: ComponentsStateType) => {
      // = 设定默认值  : 重命名变量
      const { componentList = [], selectedId: removedId } = draft

      // 重新计算 selectedId 删除选中组件后，要选中的下一个组件
      const newSelectedId = getNextSelectedId(removedId, componentList)
      draft.selectedId = newSelectedId

      const index = componentList.findIndex((c) => c.fe_id === removedId)
      componentList.splice(index, 1)
    }),

    // 工具栏：隐藏/显示组件
    // 在 EditCanvas 中通过过滤只返回没有被隐藏的组件
    changeComponentHidden: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ fe_id: string; isHidden: boolean }>
      ) => {
        const { componentList = [] } = draft
        const { fe_id, isHidden } = action.payload

        // 重新计算 selectedId，隐藏选中组件后要选中下一个没有隐藏的组件
        let newSelectedId = ''
        if (isHidden) {
          // 要隐藏
          newSelectedId = getNextSelectedId(fe_id, componentList)
        } else {
          // 要显示，选中的组件应该是要显示的组件
          newSelectedId = fe_id
        }
        draft.selectedId = newSelectedId

        const curComp = componentList.find((c) => c.fe_id === fe_id)
        if (curComp) {
          curComp.isHidden = isHidden
        }
      }
    ),

    // 工具栏：锁定/解锁组件
    toggleComponentLocked: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ fe_id: string }>
      ) => {
        const { fe_id } = action.payload

        const curComp = draft.componentList.find((c) => c.fe_id === fe_id)
        if (curComp) {
          curComp.isLocked = !curComp.isLocked
        }
      }
    ),

    // 工具栏：拷贝选中的组件
    copySelectedComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, componentList = [] } = draft
      const selectedComponent = componentList.find(
        (c) => c.fe_id === selectedId
      )
      if (selectedComponent == null) return
      draft.copiedComponent = cloneDeep(selectedComponent) // lodash 的深拷贝函数
    }),

    // 工具栏：粘贴组件
    pasteCopiedComponent: produce((draft: ComponentsStateType) => {
      const { copiedComponent } = draft
      if (copiedComponent == null) return

      // 在拷贝功能中，被拷贝组件的fe_id也被拷贝了，为了保证组件的唯一性，要修改拷贝得到的组件的 fe_id，重要！！
      copiedComponent.fe_id = nanoid()

      // 插入 copiedComponent
      insertNewComponent(draft, copiedComponent)
    }),

    // 快捷键：选中上一个
    selectPrevComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, componentList } = draft
      const selectedIndex = componentList.findIndex(
        (c) => c.fe_id === selectedId
      )

      if (selectedIndex < 0) return // 未选中组件
      if (selectedIndex <= 0) return // 已经选中了第一个，无法再向上选中

      draft.selectedId = componentList[selectedIndex - 1].fe_id
    }),

    // 快捷键：选中下一个
    selectNextComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, componentList } = draft
      const selectedIndex = componentList.findIndex(
        (c) => c.fe_id === selectedId
      )

      if (selectedIndex < 0) return // 未选中组件
      if (selectedIndex + 1 === componentList.length) return // 已经选中了最后一个，无法再向下选中

      draft.selectedId = componentList[selectedIndex + 1].fe_id
    })
  }
})

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent
} = componentsSlice.actions

export default componentsSlice.reducer
