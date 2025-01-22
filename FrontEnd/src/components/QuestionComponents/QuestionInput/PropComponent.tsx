import React, { FC, useEffect } from 'react'
import { Form, Input } from 'antd'
import { QuestionInputPropsType } from './interface'

const PropComponent: FC<QuestionInputPropsType> = (
  props: QuestionInputPropsType
) => {
  const { title, placeholder, onChange, disabled } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ title, placeholder })
  }, [title, placeholder])

  function handleValueChange() {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ title, placeholder }}
      form={form}
      onValuesChange={handleValueChange}
      disabled={disabled}
    >
      {/* name 属性的值必须与解构出来的title一致，
      否则收集表单内容传给onChange函数时会导致类型不匹配 */}
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: '请输入标题' }]}
      >
        <Input />
      </Form.Item>

      {/* name 属性的值必须与解构出来的text一致，
      否则收集表单内容传给placeholder函数时会导致类型不匹配 */}
      <Form.Item label="提示符" name="placeholder">
        <Input />
      </Form.Item>
    </Form>
  )
}

export default PropComponent
