import Component from './Component'
import { QuestionTitleDefaultProps } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

// title 组件的配置
export default {
  title: '标题',
  type: 'questionTitle',
  Component, // 画布中的组件
  PropComponent, // 右侧栏描述画布中组件的属性的组件
  defaultProps: QuestionTitleDefaultProps
}
