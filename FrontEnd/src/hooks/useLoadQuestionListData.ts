// 在搜索、打开星标问卷、打开我的问卷都需要获取列表，因此可以将获取列表的公共逻辑抽离成useLoadQuestionListData

import { useRequest } from 'ahooks'
import { getQuestionListService } from '../services/question'
import { useSearchParams } from 'react-router-dom'
import {
  LIST_SEARCH_PARAM_KEY,
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_PARAM_KEY,
  LIST_PAGE_SIZE
} from '../constant'

type OptionType = {
  isStar: boolean
  isDeleted: boolean
}

function useLoadQuestionListData(opt: Partial<OptionType> = {}) {
  // 可以不用为isStar和isDeleted赋初值，因为若它们是undefined，在被传给getQuestionListService后，不会被拼接到url后面
  const { isStar, isDeleted } = opt
  const [searchParams] = useSearchParams()
  // 搜索组件与列表组件解耦合的体现：通过搜索栏获取搜索参数
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
  const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
  const pageSize =
    parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE
  // refresh函数 不依赖于任何项，只要调用它就能刷新 将它导出，给用于回收站恢复页面后自动刷新
  const { data, loading, error, refresh } = useRequest(
    async () => {
      const data = await getQuestionListService({
        keyword,
        isStar,
        isDeleted,
        page,
        pageSize
      })
      return data
    },
    {
      // useRequest执行的依赖项
      refreshDeps: [searchParams]
    }
  )

  return { data, loading, error, refresh }
}

export default useLoadQuestionListData
