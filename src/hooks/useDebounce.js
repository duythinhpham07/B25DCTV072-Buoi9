import { useEffect, useState } from 'react'

// Trả về value sau khi người dùng ngừng thay đổi `delay` ms
export default function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}
