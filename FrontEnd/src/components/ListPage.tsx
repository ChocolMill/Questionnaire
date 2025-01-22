import React, { FC, useEffect, useState } from 'react'
import { Pagination } from 'antd'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import {
  LIST_PAGE_SIZE,
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_PARAM_KEY
} from '../constant'

type PropsType = {
  total: number
}

const ListPage: FC<PropsType> = (props: PropsType) => {
  const { total } = props
  const [current, setCurrent] = useState(10)
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE)

  // 从url参数中找到pageSize并且同步到分页组件中
  const [searchParams] = useSearchParams()
  useEffect(() => {
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
    setCurrent(page)

    const pageSize =
      parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') ||
      LIST_PAGE_SIZE
    setPageSize(pageSize)
    // useEffect本身并不能监听对象内部属性的变化，除非对象被重新赋值
    // useEffect之所以能监听searchParams对象，是因为
    // 当 URL 的查询参数发生变化时，searchParams 对象会自动更新（因为它是一个响应式引用），
    // 因此 useEffect 能够检测到 searchParams 的变化并重新运行
  }, [searchParams])

  // 改变url参数，当page pageSize改变时，跳转页面
  const nav = useNavigate()
  const { pathname } = useLocation()
  function handlePageChange(page: number, pageSize: number) {
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString())
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString())
    nav({
      pathname,
      search: searchParams.toString() // 使用分页功能后，url中的参数只有page和pageSize可以修改，其余不能变动
    })
  }

  return (
    <Pagination
      current={current}
      pageSize={pageSize}
      total={total}
      onChange={handlePageChange}
    />
  )
}

export default ListPage
