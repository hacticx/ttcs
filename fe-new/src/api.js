const BASE_URL = "http://localhost:3000/api"

const api = {
  async get(path) {
    const res = await fetch(BASE_URL + path, { credentials: "include" })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || "Loi server")
    return data
  },
  async post(path, body) {
    const res = await fetch(BASE_URL + path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || "Loi server")
    return data
  },
  async put(path, body) {
    const res = await fetch(BASE_URL + path, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || "Loi server")
    return data
  },
  async delete(path) {
    const res = await fetch(BASE_URL + path, {
      method: "DELETE",
      credentials: "include",
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || "Loi server")
    return data
  }
}

export default api