import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

const Acc = [
  { id: 'ad', name: 'Admin',
    email: 'admin@gmail.com',
    isAdmin: true  },
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  function login(email, password) {
    const found = Acc.find(a => a.email === email)
    if (found) {
      setUser(found)
      return true
    }
    return false 
  }

  function logout() {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin: user?.isAdmin ?? false }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
