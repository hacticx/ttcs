import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const { login, user } = useAuth()
  const navigate = useNavigate()

  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')

  if (user) {
    navigate('/')
    return null
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    const success = login(email, password)
    if (success) {
      navigate('/')
    } else {
      setError('Email không đúng.')
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
        <div className="card p-4 mt-4">
          <h4 className="mb-4 text-center">Đăng nhập</h4>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Nhập email..."
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Mật khẩu</label>
              <input
                type="password"
                className="form-control"
                placeholder="Nhập mật khẩu..."
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-danger small">{error}</p>}

            <button type="submit" className="btn btn-primary w-100">Đăng nhập</button>
          </form>

        </div>
      </div>
    </div>
  )
}
