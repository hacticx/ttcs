import { useNavigate } from 'react-router-dom'
import { useAuth }   from '../context/AuthContext.jsx'
import { useOrders } from '../context/OrderContext.jsx'

export default function Profile() {
  const { user, logout, isAdmin } = useAuth()
  const { orders } = useOrders()
  const navigate = useNavigate()

  if (!user) {
    return (
      <div className="text-center py-5">
        <p>Vui lòng <a href="/login">đăng nhập</a> để xem hồ sơ.</p>
      </div>
    )
  }

  const myOrders = orders.filter(o => o.userId === user.id)

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <div className="row">
      <div className="col-md-4">
        <div className="card p-3 mb-3">
          <div className="text-center mb-3">
            <div
              className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center fs-3"
              style={{ width: 70, height: 70 }}
            >
              {user.name.charAt(0)}
            </div>
            <h5 className="mt-2 mb-0">{user.name}</h5>
            {isAdmin && <span className="badge bg-warning text-dark">Admin</span>}
          </div>
          <p className="text-muted small text-center mb-1">📧 {user.email}</p>
          <p className="text-muted small text-center">🆔 {user.id}</p>
          <button className="btn btn-outline-danger btn-sm w-100 mt-2" onClick={handleLogout}>
            Đăng xuất
          </button>
        </div>
      </div>

      <div className="col-md-8">
        <div className="row text-center mb-3">
          <div className="col-4">
            <div className="border rounded p-2">
              <div className="fw-bold fs-5">{myOrders.length}</div>
              <div className="text-muted small">Đơn hàng</div>
            </div>
          </div>
          <div className="col-4">
            <div className="border rounded p-2">
              <div className="fw-bold fs-5">
                ${myOrders.reduce((s, o) => s + o.total, 0).toFixed(2)}
              </div>
              <div className="text-muted small">Tổng chi tiêu</div>
            </div>
          </div>
          <div className="col-4">
            <div className="border rounded p-2">
              <div className="fw-bold fs-5">
                {myOrders.filter(o => o.status === 'done').length}
              </div>
              <div className="text-muted small">Đã nhận hàng</div>
            </div>
          </div>
        </div>

        <h6>3 đơn gần nhất</h6>
        {myOrders.length === 0 ? (
          <p className="text-muted small">Chưa có đơn hàng nào.</p>
        ) : (
          myOrders.slice(0, 3).map(order => (
            <div key={order.id} className="border rounded p-2 mb-2 small">
              <div className="d-flex justify-content-between">
                <span>Đơn #{order.id.slice(-6)} — {order.createdAt}</span>
                <span className="fw-bold">${order.total.toFixed(2)}</span>
              </div>
              <div className="text-muted">
                {order.items.map(i => `${i.name} ×${i.quantity}`).join(', ')}
              </div>
            </div>
          ))
        )}

        {myOrders.length > 3 && (
          <a href="/orders" className="small">Xem tất cả đơn hàng →</a>
        )}
      </div>

    </div>
  )
}
