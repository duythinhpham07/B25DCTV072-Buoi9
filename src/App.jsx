import { useEffect, useState } from 'react'
import { API_URL, addStudent, updateStudent, deleteStudent } from './api'
import useFetch from './hooks/useFetch'
import useDebounce from './hooks/useDebounce'
import Header from './components/Header'
import StudentForm from './components/StudentForm'
import StudentTable from './components/StudentTable'

export default function App() {
  const { data: students, setData: setStudents, loading, error } = useFetch(API_URL)
  const [keyword, setKeyword] = useState('')
  const [editing, setEditing] = useState(null)
  const search = useDebounce(keyword, 400)

  useEffect(() => {
    document.title = `Quản lý sinh viên (${students.length})`
  }, [students.length])

  const filtered = students.filter((s) =>
    (s.studentCode + s.fullName + s.className).toLowerCase().includes(search.toLowerCase()),
  )

  const handleSubmit = async (student) => {
    try {
      if (editing) {
        const updated = await updateStudent(editing.id, student)
        setStudents(students.map((s) => (s.id === updated.id ? updated : s)))
        setEditing(null)
      } else {
        const added = await addStudent(student)
        setStudents([...students, added])
      }
      return true
    } catch (err) {
      alert('Không lưu được: ' + err.message)
      return false
    }
  }

  const handleDelete = async (student) => {
    if (!confirm('Xóa sinh viên ' + student.fullName + '?')) return
    try {
      await deleteStudent(student.id)
      setStudents(students.filter((s) => s.id !== student.id))
    } catch (err) {
      alert('Không xóa được: ' + err.message)
    }
  }

  return (
    <div className="container">
      <Header />

      <main className="layout">
        {/* key đổi thì form được tạo lại với dữ liệu mới */}
        <StudentForm
          key={editing ? editing.id : 'new'}
          editing={editing}
          onSubmit={handleSubmit}
          onCancel={() => setEditing(null)}
        />

        <section className="card list">
          <input
            className="input"
            placeholder="Tìm theo mã SV, họ tên, lớp..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />

          {loading && <p>Đang tải dữ liệu...</p>}
          {error && <p className="error">Lỗi: {error}</p>}
          {!loading && !error && (
            <StudentTable students={filtered} onEdit={setEditing} onDelete={handleDelete} />
          )}
        </section>
      </main>
    </div>
  )
}
