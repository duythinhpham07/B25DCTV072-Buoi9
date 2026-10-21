import { useCallback, useEffect, useState } from 'react'

// Custom hook: gom logic gọi API + 3 trạng thái data / loading / error
export default function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    if (!url) return

    const controller = new AbortController()

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(url, { signal: controller.signal })
        if (!res.ok) throw new Error(`Máy chủ trả về lỗi ${res.status}`)
        setData(await res.json())
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    load()
    // Cleanup: hủy request cũ khi url đổi hoặc component bị gỡ
    return () => controller.abort()
  }, [url, reloadKey])

  const refetch = useCallback(() => setReloadKey((k) => k + 1), [])

  if (!url) {
    return { data, setData, loading: false, error: 'Chưa cấu hình VITE_API_URL trong file .env', refetch }
  }

  return { data, setData, loading, error, refetch }
}
