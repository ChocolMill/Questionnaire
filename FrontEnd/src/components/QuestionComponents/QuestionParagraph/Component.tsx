import React, { FC } from 'react'
import { Typography } from 'antd'
import {
  QuestionParagraphPropsType,
  QuestionParagraphDefaultProps
} from './interface'

const { Paragraph } = Typography

const Component: FC<QuestionParagraphPropsType> = (
  props: QuestionParagraphPropsType
) => {
  const { text = '', isCenter = false } = {
    ...QuestionParagraphDefaultProps,
    ...props
  }

  const textList = text.split('\n') // 例如 ['hello', '123', '456']

  return (
    <Paragraph
      style={{ textAlign: isCenter ? 'center' : 'start', marginBottom: '0' }}
    >
      {textList.map((t, index) => (
        <span key={index}>
          {t}
          <br />
        </span>
      ))}
    </Paragraph>
  )
}

export default Component
