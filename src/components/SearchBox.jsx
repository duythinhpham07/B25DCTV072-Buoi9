export default function SearchBox({ value, onChange }) {
  return (
    <input
      type="search"
      className="input search"
      placeholder="Tìm theo mã SV, họ tên, lớp..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
