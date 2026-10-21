import ThemeToggle from './ThemeToggle'

// Header không nhận props theme: ThemeToggle tự lấy từ Context (không prop drilling)
export default function Header({ total }) {
  return (
    <header className="header">
      <div>
        <h1>Quản lý sinh viên</h1>
        <p className="muted">{total} sinh viên · dữ liệu từ mockapi</p>
      </div>
      <ThemeToggle />
    </header>
  )
}
