import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart }   from '../context/CartContext.jsx'
import { useOrders } from '../context/OrderContext.jsx'
import { useAuth }   from '../context/AuthContext.jsx'

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, total } = useCart()
  const { placeOrder } = useOrders()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: '', phone: '', address: '' })
  const [message, setMessage] = useState('')

  function handleFormChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  
  async function handleCheckout() {
    if (!user)           return setMessage('Vui lòng đăng nhập.')
    if (!cart.length)    return setMessage('Giỏ hàng trống.')
    if (!form.name || !form.phone || !form.address) 
      return setMessage('Điền đủ thông tin giao hàng.')
    try {
      await placeOrder({
        items: cart.map(i => ({
          menu_item_id: i._id,
          name:         i.name,
          price:        i.price,
          quantity:     i.quantity,
        })),
        total,
        customer_name: form.name,
        phone:         form.phone,
        address:       form.address,
      })
      clearCart()
      navigate('/orders')
    } catch (err) {
      setMessage(err.message)
    }
  }

  if (cart.length === 0 && !message) {
    return (
      <div className="text-center py-5">
        <h4>Giỏ hàng trống 🛒</h4>
        <p className="text-muted">Hãy thêm vài món từ thực đơn nhé!</p>
        <a href="/menu" className="btn btn-primary">Đến thực đơn</a>
      </div>
    )
  }

  return (
    <div className="row">
      <div className="col-md-7">
        <h4 className="mb-3">Giỏ hàng của bạn</h4>

        {cart.map(item => (
          <div key={item.id} className="d-flex align-items-center border rounded p-2 mb-2 gap-3">
            <img
              src={item.image}
              alt={item.name}
              style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 6 }}
            />

            <div className="flex-grow-1">
              <div className="fw-semibold">{item.name}</div>
              <div className="text-muted small">${item.price.toFixed(2)} / cái</div>
            </div>

            <div className="d-flex align-items-center gap-1">
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >−</button>
              <span className="px-2">{item.quantity}</span>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >+</button>
            </div>

            <div className="fw-bold" style={{ minWidth: 60, textAlign: 'right' }}>
              ${(item.price * item.quantity).toFixed(2)}
            </div>

            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => removeFromCart(item.id)}
            >✕</button>
          </div>
        ))}

        <div className="text-end fw-bold fs-5 mt-2">
          Tổng: <span className="text-success">${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="col-md-5">
        <h4 className="mb-3">Thông tin giao hàng</h4>

        <div className="mb-2">
          <label className="form-label">Họ tên</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={form.name}
            onChange={handleFormChange}
          />
        </div>

        <div className="mb-2">
          <label className="form-label">Số điện thoại</label>
          <input
            type="tel"
            className="form-control"
            name="phone"
            value={form.phone}
            onChange={handleFormChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Địa chỉ</label>
          <textarea
            className="form-control"
            name="address"
            rows="2"
            value={form.address}
            onChange={handleFormChange}
          />
        </div>

        {message && <p className="text-danger small">{message}</p>}

        <button className="btn btn-success w-100" onClick={handleCheckout}>
          Đặt hàng — ${total.toFixed(2)}
        </button>
      </div>

    </div>
  )
}
