import React, { FC } from 'react'
import { Typography } from 'antd'
import { QuestionTitlePropsType, QuestionTitleDefaultProps } from './interface'

const { Title } = Typography

const QuestionTitle: FC<QuestionTitlePropsType> = (
  props: QuestionTitlePropsType
) => {
  // 画布中的组件需要有属性
  // 比如一个QuestionTitle组件可以设置内容、层级和居中
  // 因此标题内容、层级和是否居中都是QuestionTitle组件的属性
  // 除了以上属性，一个组件还用该有一个默认属性，它是以上属性的默认值

  const genFontSize = (level: number) => {
    const levelArr = ['24px', '20px', '16px']
    return level >= levelArr.length || level < 0 ? '16px' : levelArr[level - 1]
  }

  // text = '', level = 1, isCenter = false
  const {
    text = '',
    level = 1,
    isCenter = false
  } = { ...QuestionTitleDefaultProps, ...props }
  return (
    <Title
      level={level}
      style={{
        textAlign: isCenter ? 'center' : 'start',
        margin: '0',
        fontSize: genFontSize(level)
      }}
    >
      {text}
    </Title>
  )
}

export default QuestionTitle
