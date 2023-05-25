import { useCallback, useState } from "react"


export default function useFetch(reqObj, cb) {
  const [data, setData] = useState([])

  const [loading, setloading] = useState(false)

  const [error, setError] = useState(null)

  const fetchData = useCallback(async (body) => {
    try {
      // 数据开始加载
      setloading(true)
      // 重置错误问题
      setError(null)

      const res = await fetch('http://localhost:1337/api/' + reqObj.url, {
        method: reqObj.method || 'GET',
        headers: { "Content-Type": 'application/json' },
        body: body ? JSON.stringify({ data: body }) : null

      })
      if (res.ok) {
        const data = await res.json()
        setData(data.data)
        setloading(false)
        cb && cb()
      } else {
        throw new Error('数据加载失败')
      }

    } catch (e) {
      console.log(e);
      setError(e)
    } finally {
      setloading(false)
    }

  }, [])

  return {
    data,
    loading,
    error,
    fetchData
  }
}