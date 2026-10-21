import { useEffect, useState } from 'react'

export default function useFetch(url) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignore = false

    async function fetchData() {
      try {
        const res = await fetch(url)
        if (!res.ok) throw new Error('Lỗi ' + res.status)
        const json = await res.json()
        if (!ignore) setData(json)
      } catch (err) {
        if (!ignore) setError(err.message)
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    fetchData()

    // cleanup: bỏ qua kết quả cũ nếu url đổi hoặc component bị gỡ
    return () => {
      ignore = true
    }
  }, [url])

  return { data, setData, loading, error }
}
