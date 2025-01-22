import React, { FC, useState, ChangeEvent, useEffect } from 'react'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { Input } from 'antd'
import { LIST_SEARCH_PARAM_KEY } from '../constant'

const { Search } = Input

const ListSearch: FC = () => {
  const nav = useNavigate()
  // pathname是url的路径部分
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  const [value, setValue] = useState('')

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    // 受控组件
    setValue(event.target.value)
  }

  // 获取 url 参数，并设置到 input value中
  // 可以令页面在刷新后输入框的值还被保留
  // 也可以令页面在不刷新的情况下（如前进和后退），使输入框的值跟随变化
  useEffect(() => {
    const curVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
    setValue(curVal)
  }, [searchParams])

  function handleSearch(value: string) {
    nav({
      pathname,
      // 使用搜索功能后的url无需保留页数和页面大小
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`
    })
  }

  return (
    <Search
      placeholder="输入关键词"
      onChange={handleChange}
      onSearch={handleSearch}
      style={{ width: '260px' }}
      value={value}
      size="large"
      allowClear
    />
  )
}

export default ListSearch
