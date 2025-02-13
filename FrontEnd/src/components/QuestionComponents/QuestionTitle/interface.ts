// 定义组件类型（组件需要什么属性）
export type QuestionTitlePropsType = {
  text?: string
  level?: 1 | 2 | 3 | 4 | 5
  isCenter?: boolean

  onChange?: (newProps: QuestionTitlePropsType) => void
  disabled?: boolean
}

// 默认属性
export const QuestionTitleDefaultProps: QuestionTitlePropsType = {
  text: '一行标题',
  level: 1,
  isCenter: false
}
