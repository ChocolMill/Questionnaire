import Component from './Component'
// import PropComponent from './PropComponent'
// import StatComponent from './StatComponent'
import { QuestionRadioDefaultProps } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

// Radio 组件配置信息
export default {
  title: '单选',
  type: 'questionRadio',
  Component,
  PropComponent,
  defaultProps: QuestionRadioDefaultProps
  // StatComponent
}
