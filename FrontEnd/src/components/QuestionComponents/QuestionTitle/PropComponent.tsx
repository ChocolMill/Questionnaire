/**
 * @description: 属性组件，用于描述画布中组件的属性的组件，即右侧栏组件
 */

import React, { FC, useEffect } from 'react'
import { Form, Input, Select, Checkbox } from 'antd'
import { QuestionTitlePropsType } from './interface'
import { useForm } from 'antd/es/form/Form'

const PropComponent: FC<QuestionTitlePropsType> = (
  props: QuestionTitlePropsType
) => {
  const { text, level, isCenter, onChange, disabled } = props
  const [form] = useForm()

  useEffect(() => {
    form.setFieldsValue({ text, level, isCenter })
  }, [text, level, isCenter])

  function handleValueChange() {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ text, level, isCenter }}
      form={form}
      onValuesChange={handleValueChange}
      disabled={disabled}
    >
      {/* name 属性的值必须与解构出来的text一致，
      否则收集表单内容传给onChange函数时会导致类型不匹配 */}
      <Form.Item
        label="标题内容"
        name="text"
        rules={[{ required: true, message: '请输入标题' }]}
      >
        <Input />
      </Form.Item>

      {/* name 属性的值必须与解构出来的level一致，
      否则收集表单内容传给onChange函数时会导致类型不匹配 */}
      <Form.Item label="层级" name="level">
        <Select
          options={[
            { value: 1, text: 1 },
            { value: 2, text: 2 },
            { value: 3, text: 3 }
          ]}
        ></Select>
      </Form.Item>

      {/* name 属性的值必须与解构出来的isCenter一致，
      否则收集表单内容传给onChange函数时会导致类型不匹配 */}
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
