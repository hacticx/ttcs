import { useOrders } from '../context/OrderContext.jsx'
import { useAuth }   from '../context/AuthContext.jsx'

const STATUS_COLOR = {
  pending:    'warning',
  preparing:  'info',
  delivering: 'primary',
  done:       'success',
  cancelled:  'danger',
}

const STATUS_LABEL = {
  pending:    'Chờ xác nhận',
  preparing:  'Đang chuẩn bị',
  delivering: 'Đang giao',
  done:       'Đã giao',
  cancelled:  'Đã huỷ',
}

export default function Orders() {
  const { orders, updateStatus } = useOrders()
  const { user, isAdmin } = useAuth()

  if (!user) {
    return (
      <div className="text-center py-5">
        <p>Vui lòng <a href="/login">đăng nhập</a> để xem đơn hàng.</p>
      </div>
    )
  }

  const visibleOrders = isAdmin
    ? orders
    : orders.filter(o => o.userId === user.id)

  return (
    <div>
      <h4 className="mb-3">
        {isAdmin ? '⚙ Quản lý đơn hàng (Admin)' : 'Đơn hàng của bạn'}
      </h4>

      {visibleOrders.length === 0 ? (
        <p className="text-muted">Chưa có đơn hàng nào.</p>
      ) : (
        visibleOrders.map(order => (
          <div key={order.id} className="border rounded p-3 mb-3">

            <div className="d-flex justify-content-between align-items-center mb-2">
              <div>
                <span className="fw-semibold">Đơn #{order.id.slice(-6)}</span>
                <span className="text-muted small ms-2">{order.createdAt}</span>
                {isAdmin && <span className="text-muted small ms-2">— {order.userName}</span>}
              </div>
              <span className={`badge bg-${STATUS_COLOR[order.status] || 'secondary'}`}>
                {STATUS_LABEL[order.status] || order.status}
              </span>
            </div>

            <ul className="list-unstyled mb-2">
              {order.items.map(item => (
                <li key={item.id} className="small text-muted">
                  {item.name} × {item.quantity} — ${(item.price * item.quantity).toFixed(2)}
                </li>
              ))}
            </ul>

            <div className="d-flex justify-content-between align-items-end">
              <div className="small text-muted">
                📍 {order.address} · 📞 {order.phone}
              </div>
              <div className="fw-bold text-success">${order.total.toFixed(2)}</div>
            </div>

            {isAdmin && (
              <div className="mt-2 d-flex gap-2 flex-wrap">
                {Object.keys(STATUS_LABEL).map(s => (
                  <button
                    key={s}
                    className={`btn btn-sm ${order.status === s ? 'btn-dark' : 'btn-outline-secondary'}`}
                    onClick={() => updateStatus(order.id, s)}
                  >
                    {STATUS_LABEL[s]}
                  </button>
                ))}
              </div>
            )}

          </div>
        ))
      )}
    </div>
  )
}
