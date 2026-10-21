import { useEffect, useRef, useState } from 'react'

const emptyForm = { studentCode: '', fullName: '', className: '', email: '', gpa: '' }

function validate(form) {
  const errors = {}
  if (!/^B\d{2}[A-Z]{4}\d{3}$/i.test(form.studentCode)) errors.studentCode = 'Mã SV không hợp lệ (VD: B25DCTV072)'
  if (form.fullName.trim() === '') errors.fullName = 'Chưa nhập họ tên'
  if (form.className.trim() === '') errors.className = 'Chưa nhập lớp'
  if (!form.email.includes('@')) errors.email = 'Email không hợp lệ'
  if (form.gpa === '' || form.gpa < 0 || form.gpa > 4) errors.gpa = 'GPA từ 0 đến 4'
  return errors
}

export default function StudentForm({ editing, onSubmit, onCancel }) {
  const [form, setForm] = useState(editing || emptyForm)
  const [errors, setErrors] = useState({})
  const inputRef = useRef(null)

  // bấm Sửa thì focus vào ô đầu tiên
  useEffect(() => {
    if (editing) inputRef.current.focus()
  }, [editing])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    const ok = await onSubmit({ ...form, studentCode: form.studentCode.toUpperCase(), gpa: Number(form.gpa) })
    if (ok && !editing) setForm(emptyForm)
  }

  return (
    <form className="card form" onSubmit={handleSubmit} noValidate>
      <h2>{editing ? 'Sửa sinh viên' : 'Thêm sinh viên'}</h2>

      <label>Mã SV</label>
      <input ref={inputRef} className="input" name="studentCode" value={form.studentCode} onChange={handleChange} />
      {errors.studentCode && <small className="error">{errors.studentCode}</small>}

      <label>Họ tên</label>
      <input className="input" name="fullName" value={form.fullName} onChange={handleChange} />
      {errors.fullName && <small className="error">{errors.fullName}</small>}

      <label>Lớp</label>
      <input className="input" name="className" value={form.className} onChange={handleChange} />
      {errors.className && <small className="error">{errors.className}</small>}

      <label>Email</label>
      <input className="input" name="email" value={form.email} onChange={handleChange} />
      {errors.email && <small className="error">{errors.email}</small>}

      <label>GPA</label>
      <input className="input" name="gpa" type="number" step="0.01" value={form.gpa} onChange={handleChange} />
      {errors.gpa && <small className="error">{errors.gpa}</small>}

      <div className="actions">
        <button type="submit" className="btn btn-primary">{editing ? 'Cập nhật' : 'Thêm'}</button>
        {editing && <button type="button" className="btn" onClick={onCancel}>Hủy</button>}
      </div>
    </form>
  )
}
