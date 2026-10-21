export default function StudentTable({ students, editingId, onEdit, onDelete }) {
  if (students.length === 0) {
    return <p className="muted empty">Không có sinh viên nào phù hợp.</p>
  }

  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th>Mã SV</th>
            <th>Họ tên</th>
            <th>Lớp</th>
            <th>Email</th>
            <th className="num">GPA</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id} className={s.id === editingId ? 'row-active' : undefined}>
              <td>{s.studentCode}</td>
              <td>{s.fullName}</td>
              <td>{s.className}</td>
              <td>{s.email}</td>
              <td className="num">{Number(s.gpa).toFixed(2)}</td>
              <td>
                <div className="row-actions">
                  <button className="btn btn-small" onClick={() => onEdit(s)}>Sửa</button>
                  <button className="btn btn-small btn-danger" onClick={() => onDelete(s)}>
                    Xóa
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
