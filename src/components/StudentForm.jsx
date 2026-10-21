import { useEffect, useRef, useState } from 'react'

const EMPTY = { studentCode: '', fullName: '', className: '', email: '', gpa: '' }

function validate(form) {
  const errors = {}
  if (!/^B\d{2}[A-Z]{4}\d{3}$/i.test(form.studentCode.trim()))
    errors.studentCode = 'Mã SV dạng B25DCTV072'
  if (form.fullName.trim().length < 2) errors.fullName = 'Họ tên tối thiểu 2 ký tự'
  if (!form.className.trim()) errors.className = 'Nhập lớp'
  if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) errors.email = 'Email không hợp lệ'
  const gpa = Number(form.gpa)
  if (form.gpa === '' || Number.isNaN(gpa) || gpa < 0 || gpa > 4)
    errors.gpa = 'GPA từ 0 đến 4'
  return errors
}

// App truyền key={editing?.id} nên form được tạo lại mỗi khi chọn sinh viên khác
export default function StudentForm({ editing, saving, onSubmit, onCancel }) {
  const [form, setForm] = useState(() =>
    editing ? { ...EMPTY, ...editing, gpa: String(editing.gpa ?? '') } : EMPTY,
  )
  const [errors, setErrors] = useState({})
  const firstInputRef = useRef(null)

  // Khi mở form sửa: focus ô đầu tiên (useRef truy cập DOM)
  useEffect(() => {
    if (editing) firstInputRef.current?.focus()
  }, [editing])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    const ok = await onSubmit({
      studentCode: form.studentCode.trim().toUpperCase(),
      fullName: form.fullName.trim(),
      className: form.className.trim().toUpperCase(),
      email: form.email.trim(),
      gpa: Number(form.gpa),
    })
    if (ok && !editing) setForm(EMPTY)
  }

  const field = (name, label, props = {}) => (
    <label className="field">
      <span>{label}</span>
      <input
        className={`input${errors[name] ? ' input-error' : ''}`}
        name={name}
        value={form[name]}
        onChange={handleChange}
        {...props}
      />
      {errors[name] && <small className="error-text">{errors[name]}</small>}
    </label>
  )

  return (
    <form className="card form" onSubmit={handleSubmit} noValidate>
      <h2>{editing ? 'Sửa sinh viên' : 'Thêm sinh viên'}</h2>
      {field('studentCode', 'Mã SV', { ref: firstInputRef, placeholder: 'B25DCTV072' })}
      {field('fullName', 'Họ tên', { placeholder: 'Nguyễn Văn A' })}
      {field('className', 'Lớp', { placeholder: 'D25CQTV02-B' })}
      {field('email', 'Email', { type: 'email', placeholder: 'a@stu.ptit.edu.vn' })}
      {field('gpa', 'GPA (hệ 4)', { type: 'number', step: '0.01', min: 0, max: 4 })}

      <div className="actions">
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? 'Đang lưu...' : editing ? 'Cập nhật' : 'Thêm'}
        </button>
        {editing && (
          <button type="button" className="btn btn-ghost" onClick={onCancel} disabled={saving}>
            Hủy
          </button>
        )}
      </div>
    </form>
  )
}
