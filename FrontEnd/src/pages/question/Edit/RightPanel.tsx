import React, { FC } from 'react'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import ComponentProp from './ComponentProp'

const RightPanel: FC = () => {
  const tabsItems = [
    {
      key: 'porp', //TAB_KEYS.PROP_KEY,
      label: (
        <span>
          <FileTextOutlined />
          属性
        </span>
      ),
      children: <ComponentProp />
    },
    {
      key: 'setting', // TAB_KEYS.SETTING_KEY,
      label: (
        <span>
          <SettingOutlined />
          页面设置
        </span>
      ),
      children: <div>页面设置</div> // <PageSetting />
    }
  ]

  return <Tabs defaultActiveKey="prop" items={tabsItems}></Tabs>
}

export default RightPanel
