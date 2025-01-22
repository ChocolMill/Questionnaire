import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import QuestionCard from '../../components/QuestionCard'
// import { useSearchParams } from 'react-router-dom'
import { useDebounceFn, useTitle, useRequest } from 'ahooks'
import { Typography, Spin, Empty } from 'antd'
import ListSearch from '../../components/ListSearch'
import { getQuestionListService } from '../../services/question'
import styles from './common.module.scss'
import { useSearchParams } from 'react-router-dom'
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from '../../constant'
// import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'

const { Title } = Typography

const List: FC = () => {
  useTitle('小象问卷 - 我的问卷')

  // 上划加载功能不需要useLoadQuestionListData钩子

  // const [searchParams] = useSearchParams()
  // console.log('keyword', searchParams.get('keyword'))

  // 如果不初始化data，那么解构data时会出现解构undefined的错误
  // const { data = {}, loading } = useLoadQuestionListData()
  // 要为list和total初始化，否则在请求（异步操作）过程中，由于异步与同步的关系，
  // list没有被及时赋值，会在使用list.length时报错
  // const { list = [], total = 0 } = data

  // 标记是否已经开始加载
  // 防抖会有延迟时间，这会导致用户在看到“开始加载下一页”后，要等一小段时间才能看到加载动画，体验并不好，需要优化
  const [started, setStarted] = useState(false)
  const [page, setPage] = useState(1) // 不在url参数中体现
  const [list, setList] = useState([]) // 上划加载后累计得到的数据 每次请求都只请求10条数据，但是请求得到的数据会拼接到list数组
  const [total, setToatal] = useState(1)
  const haveMoreData = total > list.length // 是否还有更多数据
  // console.log(list.length)

  const [searchParams] = useSearchParams()
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''

  // 启用搜索功能（keyword发生变化）后，原先的分页设置无需保留
  useEffect(() => {
    setList([])
    setPage(1)
    setToatal(0)
    setStarted(false)
    // console.log(1)
  }, [keyword])

  // 真正加载
  const { run: load, loading } = useRequest(
    async () => {
      setStarted(true)
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword
      })
      setStarted(false)
      return data
    },
    {
      manual: true,
      onSuccess(result: any) {
        const { list: l = [], total = 0 } = result
        setList(list.concat(l))
        setToatal(total)
        setPage(page + 1)
        // console.log(2)
      }
    }
  )

  // 尝试加载 - 防抖
  const containerRef = useRef<HTMLDivElement>(null)
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      // console.log(3)
      const elem = containerRef.current
      if (elem === null) return
      const domRect = elem.getBoundingClientRect()
      if (domRect === null) return
      const { bottom } = domRect
      // document.body.clientHeight 表示的是 body 元素内部的可用高度，不包括边框和外边距
      // document.documentElement.clientHeight 则是视窗的高度
      if (bottom <= document.documentElement.clientHeight) {
        // 真正加载数据
        load()
      }
    },
    {
      wait: 1000
    }
  )

  // 1. 组件加载完毕和搜索参数变化时触发加载
  useEffect(() => {
    tryLoadMore()
    // console.log(4)
  }, [searchParams])

  // 2. 当页面滚动时，要尝试触发加载
  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener('scroll', tryLoadMore)
    }

    return () => {
      window.removeEventListener('scroll', tryLoadMore)
    }
  }, [searchParams])

  // LoadMore Elem
  const LoadMoreContentElem = useMemo(() => {
    if (!started || loading) return <Spin />
    if (total === 0) return <Empty description="暂无数据" />
    if (!haveMoreData) return <span>没有更多了</span>
    return <span>开始加载下一页</span>
  }, [started, loading, haveMoreData])

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>

      <div className={styles.content}>
        {list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q
            // 向QuestionCard传递数据
            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>{LoadMoreContentElem}</div>
      </div>
    </>
  )
}

export default List
