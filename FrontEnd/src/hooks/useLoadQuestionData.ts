// import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getQuestionService } from '../services/question'
import { useRequest } from 'ahooks'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { resetComponents } from '../store/componentsReducer'

function useLoadQuestionData() {
  const { id = '' } = useParams()
  const dispatch = useDispatch()
  // const [loading, setLoading] = useState(true)
  // const [questionData, setQuestionData] = useState({})

  // useEffect(() => {
  //   async function fn() {
  //     const data = await getQuestionService(id)
  //     setQuestionData(data)
  //     setLoading(false)
  //   }
  //   fn()
  // }, [])
  // return { loading, questionData }

  // 因为getQuestionService需要参数而useRequest的参数只能是异步函数名
  // 因此要额外的封装，当然也可以直接在useRequest内直接定义异步函数

  const { data, loading, error, run } = useRequest(
    async (id: string) => {
      if (!id) throw new Error('没有问卷 id')
      const data = await getQuestionService(id)
      return data
    },
    {
      manual: true
    }
  )

  // 根据获取的 data 设置 redux store
  useEffect(() => {
    if (!data) return
    const { title = '', componentList = [] } = data

    // 获取默认的 selectedId，即加载到编辑页面默认选中第一个组件
    let selectedId = ''
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id
    }

    // 把 componentList 存储到 Redux store 中
    dispatch(
      resetComponents({ componentList, selectedId, copiedComponent: null })
    )
    console.log('useLoadQuestionData_componentList: ', componentList)
  }, [data])

  // 判断 id 变化，执行 ajax 加载问卷数据
  useEffect(() => {
    run(id)
  }, [id])

  return { loading, data, error }
}

export default useLoadQuestionData
