import React, { FC } from 'react'
import { Typography, Space, Form, Input, Button, message } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN_PATHNAME } from '../router'
import styles from './Register.module.scss'
import { useRequest } from 'ahooks'
import { registerService } from '../services/user'

const { Title } = Typography

const Register: FC = () => {
  const nav = useNavigate()

  const { run: registry } = useRequest(
    async (values) => {
      const { username, password, nickname } = values
      await registerService(username, password, nickname)
    },
    {
      manual: true,
      onSuccess() {
        message.success('注册成功！')
        // 注册成功后，导航至登录页面
        nav(LOGIN_PATHNAME)
      }
    }
  )
  const onFinish = (values: any) => {
    registry(values)
  }
  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>注册新用户</Title>
        </Space>
      </div>
      <div>
        {/* labelCol和wrapperCol的含义？ */}
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              {
                type: 'string',
                min: 5,
                max: 20,
                message: '字符长度在5~20之间'
              },
              { pattern: /^\w+$/, message: '只能是字母、数字和下划线' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="确认密码"
            name="confirm"
            dependencies={['password']} // password 变化会触发validator
            rules={[
              { required: true, message: '请输入密码' },
              // 解构得到getFieldValue
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  } else {
                    return Promise.reject(new Error('两次密码不一致'))
                  }
                }
              })
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item label="昵称" name="nickname">
            <Input />
          </Form.Item>

          {/* 设置offset，可以控制输入控件相对于其父元素的偏移量 */}
          <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
            <Space>
              {/* htmlType 对应的是原生html中的type，type被antdesign组件使用 */}
              <Button type="primary" htmlType="submit">
                注册
              </Button>
              <Link to={LOGIN_PATHNAME}>已有账户</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Register
