import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <button className="btn" onClick={toggleTheme}>
      {theme === 'light' ? '🌙 Tối' : '☀️ Sáng'}
    </button>
  )
}
