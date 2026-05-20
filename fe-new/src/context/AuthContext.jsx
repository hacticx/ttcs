import { createContext, useContext, useState, useEffect } from 'react'
import api from '../api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get("/auth/check")
      .then(data => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  async function login(email, password) {
    const data = await api.post("/auth/login", { email, password })
    setUser(data.user)
  }

  async function register(first_name, last_name, email, password) {
    const data = await api.post("/auth/register", { first_name, last_name, email, password })
    return data
  }

  async function logout() {
    await api.post("/auth/logout", {})
    setUser(null)
  }

  if (loading) return <div className="text-center p-5">Đang tải...</div>

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAdmin: user?.role === "admin" }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}