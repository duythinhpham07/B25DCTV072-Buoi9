export const API_URL = import.meta.env.VITE_API_URL

async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) throw new Error(`Máy chủ trả về lỗi ${res.status}`)
  return res.json()
}

export const createStudent = (student) =>
  request(API_URL, { method: 'POST', body: JSON.stringify(student) })

export const updateStudent = (id, student) =>
  request(`${API_URL}/${id}`, { method: 'PUT', body: JSON.stringify(student) })

export const deleteStudent = (id) =>
  request(`${API_URL}/${id}`, { method: 'DELETE' })
