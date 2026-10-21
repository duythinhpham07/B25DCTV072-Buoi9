# Buổi 9 – Quản lý sinh viên (Function Component + Hooks)

Phạm Duy Thịnh – B25DCTV072 – Lập trình Web

Ứng dụng quản lý sinh viên viết hoàn toàn bằng Function Component và Hooks (không có Class Component). Dữ liệu lấy từ mockapi.io.

## Chức năng

- Xem danh sách sinh viên, có đủ 3 trạng thái: đang tải / lỗi / có dữ liệu
- Thêm, sửa, xóa sinh viên (form có validate)
- Tìm kiếm theo mã SV, họ tên, lớp, có debounce 400ms
- Chuyển giao diện sáng/tối bằng `ThemeContext`, lưu lựa chọn vào localStorage

## Hooks sử dụng

- `useState`: state form, danh sách, từ khóa tìm kiếm, theme
- `useEffect`: gọi API, debounce tìm kiếm, đổi `document.title`, lưu theme, focus ô input khi sửa
- `useRef`: focus vào ô Mã SV khi bấm Sửa
- `useContext`: `ThemeToggle` lấy theme từ `ThemeContext`, không phải truyền props qua nhiều tầng
- Custom hook: `useFetch` (data / loading / error), `useDebounce`

## Cấu trúc

```
src/
├── api.js                 # thêm / sửa / xóa qua mockapi
├── App.jsx
├── context/ThemeContext.jsx
├── hooks/useFetch.js
├── hooks/useDebounce.js
└── components/
    ├── Header.jsx
    ├── ThemeToggle.jsx
    ├── StudentForm.jsx
    └── StudentTable.jsx
```

## Dữ liệu

Danh sách lớp D25CQTV02-B (họ tên, mã SV) lấy từ S-Link. **Email và GPA là dữ liệu giả lập cho bài tập, không phải điểm thật.**
URL mockapi không đưa vào repo, em gửi kèm khi nộp bài.

## Chạy

1. Tạo resource `students` trên [mockapi.io](https://mockapi.io) với các trường: `studentCode`, `fullName`, `className`, `email` (string) và `gpa` (number).
2. Copy `.env.example` thành `.env`, rồi điền endpoint:
   ```
   VITE_API_URL=https://<project-id>.mockapi.io/api/v1/students
   ```
3. Cài và chạy:
   ```
   npm install
   npm run dev
   ```
