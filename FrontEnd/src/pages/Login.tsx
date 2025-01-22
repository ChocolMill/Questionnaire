import React, { FC, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
import { Space, Typography, Form, Input, Button, Checkbox, message } from 'antd'
import { LoginOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { REGISTER_PATHNAME, MANAGE_INDEX_PATHNAME } from '../router'
import styles from './Login.module.scss'
import { useRequest } from 'ahooks'
import { loginService } from '../services/user'
import { setToken } from '../utils/user-token'

const { Title } = Typography
const USERNAME_KEY = 'USERNAME'
const PASSWORD_KEY = 'PASSWORD'

function rememberUser(username: string, password: string) {
  localStorage.setItem(USERNAME_KEY, username)
  localStorage.setItem(PASSWORD_KEY, password)
}

function deleteLocalUser() {
  localStorage.getItem(USERNAME_KEY) && localStorage.removeItem(USERNAME_KEY)
  localStorage.getItem(PASSWORD_KEY) && localStorage.removeItem(PASSWORD_KEY)
}

function getLocalUser() {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY)
  }
}

const Login: FC = () => {
  const nav = useNavigate()

  const [form] = Form.useForm() // Form组件的hook，是第三方hook，获取表单的state

  useEffect(() => {
    const { username, password } = getLocalUser()
    form.setFieldsValue({ username, password }) // 为表单赋值
  }, [])

  const { run: login } = useRequest(
    async (values) => {
      const { username, password } = values
      return await loginService(username, password)
    },
    {
      manual: true,
      onSuccess(res) {
        const { token = '' } = res
        setToken(token)
        message.success('登录成功！')
        nav(MANAGE_INDEX_PATHNAME) // 跳转至我的问卷
      }
    }
  )

  const onFinish = (values: any) => {
    console.log(values)
    const { username, password, remember } = values
    login(values)
    if (remember) {
      rememberUser(username, password)
    } else {
      deleteLocalUser()
    }
  }

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <LoginOutlined />
          </Title>
          <Title level={2}>用户登录</Title>
        </Space>
      </div>
      <div>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          form={form} // 引入表单的state
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
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 6 }}
          >
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Link to={REGISTER_PATHNAME}>注册新用户</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
