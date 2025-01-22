import Component from './Component'
import { QuestionInputDefaultProps } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

export default {
  title: '输入框',
  type: 'questionInput',
  Component, // 画布中的组件
  PropComponent, // 右侧栏描述画布中组件的属性的组件
  defaultProps: QuestionInputDefaultProps
}
