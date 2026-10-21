export default function StudentTable({ students, onEdit, onDelete }) {
  if (students.length === 0) return <p>Không tìm thấy sinh viên nào.</p>

  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th>Mã SV</th>
            <th>Họ tên</th>
            <th>Lớp</th>
            <th>Email</th>
            <th>GPA</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.studentCode}</td>
              <td>{s.fullName}</td>
              <td>{s.className}</td>
              <td className="email">{s.email}</td>
              <td>{Number(s.gpa).toFixed(2)}</td>
              <td>
                <button className="btn btn-small" onClick={() => onEdit(s)}>Sửa</button>
                <button className="btn btn-small btn-danger" onClick={() => onDelete(s)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
