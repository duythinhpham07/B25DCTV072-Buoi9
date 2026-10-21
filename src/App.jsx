import { useEffect, useMemo, useState } from 'react'
import { API_URL, createStudent, deleteStudent, updateStudent } from './api'
import useFetch from './hooks/useFetch'
import useDebounce from './hooks/useDebounce'
import Header from './components/Header'
import SearchBox from './components/SearchBox'
import StudentForm from './components/StudentForm'
import StudentTable from './components/StudentTable'

export default function App() {
  const { data, setData, loading, error, refetch } = useFetch(API_URL)
  const students = useMemo(() => data ?? [], [data])

  const [keyword, setKeyword] = useState('')
  const debouncedKeyword = useDebounce(keyword, 400)
  const [editing, setEditing] = useState(null)
  const [saving, setSaving] = useState(false)
  const [actionError, setActionError] = useState(null)

  // Tiêu đề trang theo số sinh viên
  useEffect(() => {
    document.title = `Quản lý sinh viên (${students.length})`
  }, [students.length])

  const filtered = useMemo(() => {
    const q = debouncedKeyword.trim().toLowerCase()
    if (!q) return students
    return students.filter((s) =>
      [s.studentCode, s.fullName, s.className].some((v) => String(v).toLowerCase().includes(q)),
    )
  }, [students, debouncedKeyword])

  const handleSubmit = async (student) => {
    setSaving(true)
    setActionError(null)
    try {
      if (editing) {
        const updated = await updateStudent(editing.id, student)
        setData((prev) => prev.map((s) => (s.id === updated.id ? updated : s)))
        setEditing(null)
      } else {
        const created = await createStudent(student)
        setData((prev) => [...(prev ?? []), created])
      }
      return true
    } catch (err) {
      setActionError(`Không lưu được: ${err.message}`)
      return false
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (student) => {
    if (!window.confirm(`Xóa sinh viên ${student.fullName}?`)) return
    setActionError(null)
    try {
      await deleteStudent(student.id)
      setData((prev) => prev.filter((s) => s.id !== student.id))
      if (editing?.id === student.id) setEditing(null)
    } catch (err) {
      setActionError(`Không xóa được: ${err.message}`)
    }
  }

  return (
    <div className="container">
      <Header total={students.length} />

      <main className="layout">
        <StudentForm
          key={editing?.id ?? 'new'}
          editing={editing}
          saving={saving}
          onSubmit={handleSubmit}
          onCancel={() => setEditing(null)}
        />

        <section className="card list">
          <SearchBox value={keyword} onChange={setKeyword} />
          {actionError && <p className="alert">{actionError}</p>}

          {loading && <p className="muted status">⏳ Đang tải danh sách sinh viên...</p>}

          {!loading && error && (
            <div className="alert status">
              <p>❌ Lỗi tải dữ liệu: {error}</p>
              <button className="btn btn-small" onClick={refetch}>Thử lại</button>
            </div>
          )}

          {!loading && !error && (
            <StudentTable
              students={filtered}
              editingId={editing?.id}
              onEdit={setEditing}
              onDelete={handleDelete}
            />
          )}
        </section>
      </main>
    </div>
  )
}
