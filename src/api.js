export const API_URL = import.meta.env.VITE_API_URL

async function request(url, method, body) {
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) throw new Error('Lỗi ' + res.status)
  return res.json()
}

export const addStudent = (student) => request(API_URL, 'POST', student)
export const updateStudent = (id, student) => request(`${API_URL}/${id}`, 'PUT', student)
export const deleteStudent = (id) => request(`${API_URL}/${id}`, 'DELETE')
