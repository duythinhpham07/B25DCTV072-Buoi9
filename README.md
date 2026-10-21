# Buổi 9 – Quản lý sinh viên (Function Component + Hooks)

Phạm Duy Thịnh – B25DCTV072 – Lập trình Web

Ứng dụng quản lý sinh viên viết hoàn toàn bằng Function Component và Hooks (không có Class Component). Dữ liệu lấy từ mockapi.io.

## Chức năng

- Xem danh sách sinh viên, có đủ 3 trạng thái: đang tải / lỗi (có nút Thử lại) / dữ liệu
- Thêm, sửa, xóa sinh viên (form có validate)
- Tìm kiếm theo mã SV, họ tên, lớp, có debounce 400ms
- Chuyển giao diện sáng/tối bằng `ThemeContext`, lưu lựa chọn vào localStorage

## Hooks sử dụng

| Hook | Dùng ở đâu |
|---|---|
| `useState` | state form, danh sách, từ khóa, theme |
| `useEffect` | gọi API (`[url, reloadKey]`), debounce (`[value, delay]`), đổi `document.title` (`[students.length]`), áp theme (`[theme]`), focus khi sửa (`[editing]`) |
| `useRef` | focus ô Mã SV khi bấm Sửa |
| `useContext` | `useTheme()` đọc `ThemeContext`, `ThemeToggle` lấy theme mà không cần prop drilling |
| `useMemo`, `useCallback` | lọc danh sách, giữ hàm `refetch` ổn định |
| Custom hook | `useFetch`, `useDebounce`, `useTheme` |

## Cấu trúc

```
src/
├── api.js                  # gọi POST / PUT / DELETE
├── App.jsx
├── context/
│   ├── ThemeContext.js     # createContext
│   └── ThemeProvider.jsx   # Provider sáng/tối
├── hooks/
│   ├── useFetch.js         # data / loading / error + cleanup AbortController
│   ├── useDebounce.js
│   └── useTheme.js
└── components/
    ├── Header.jsx
    ├── ThemeToggle.jsx
    ├── SearchBox.jsx
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
