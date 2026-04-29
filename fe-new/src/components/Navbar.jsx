import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useCart } from '../context/CartContext.jsx'

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth()
  const { itemCount } = useCart()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">

        <Link className="navbar-brand fw-bold" to="/">X</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNav">

          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Trang chủ</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/menu">Thực đơn</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/orders">Đơn hàng</Link>
            </li>

            {isAdmin && (
              <li className="nav-item">
                <Link className="nav-link text-warning" to="/orders">⚙ Quản lý</Link>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-2">

            <Link to="/cart" className="btn btn-outline-light btn-sm">
              🛒 Giỏ hàng
              {itemCount > 0 && (
                <span className="badge bg-danger ms-1">{itemCount}</span>
              )}
            </Link>

            {user ? (
              <div className="dropdown">
                <button className="btn btn-outline-light btn-sm dropdown-toggle" data-bs-toggle="dropdown">
                  👤 {user.name}
                  {isAdmin && <span className="badge bg-warning text-dark ms-1">Admin</span>}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li className="dropdown-item-text text-muted small px-3">{user.email}</li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/profile">Hồ sơ cá nhân</Link></li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                      Đăng xuất
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary btn-sm">Đăng nhập</Link>
            )}

          </div>
        </div>
      </div>
    </nav>
  )
}
