const BASE_URL = "http://localhost:3000/api"

export async function apiGet(path) {
  const res = await fetch(BASE_URL + path, {
    credentials: "include",
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || "Loi server")
  return data
}

export async function apiPost(path, body) {
  const res = await fetch(BASE_URL + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || "Loi server")
  return data
}

export async function apiPut(path, body) {
  const res = await fetch(BASE_URL + path, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || "Loi server")
  return data
}

export async function apiDelete(path) {
  const res = await fetch(BASE_URL + path, {
    method: "DELETE",
    credentials: "include",
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || "Loi server")
  return data
}