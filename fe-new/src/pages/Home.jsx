import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import menuItems from '../data/menuData.js'
import MenuItem from '../components/MenuItem.jsx'

export default function Home() {
  const { user } = useAuth()

  const featuredItems = menuItems.slice(0, 4)

  return (
    <div>
      <div className="p-5 mb-4 bg-light rounded-3 text-center">
        <h1 className="display-5 fw-bold">🍕 Chào mừng đến X</h1>
        <p className="lead">Đặt đồ ăn nhanh chóng, giao hàng trong 30 phút!</p>
        {user ? (
          <p className="text-muted">Xin chào, <strong>{user.name}</strong>! Bạn muốn ăn gì hôm nay?</p>
        ) : (
          <Link to="/login" className="btn btn-primary me-2">Đăng nhập</Link>
        )}
        <Link to="/menu" className="btn btn-success">Xem thực đơn →</Link>
      </div>

      <div className="row text-center mb-4">
        <div className="col-md-4">
          <div className="border rounded p-3">
            <h3>30 phút</h3>
            <p className="text-muted mb-0">Thời gian giao hàng</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="border rounded p-3">
            <h3>Miễn phí</h3>
            <p className="text-muted mb-0">Ship khi trên $20</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="border rounded p-3">
            <h3>{menuItems.length} món</h3>
            <p className="text-muted mb-0">Trong thực đơn</p>
          </div>
        </div>
      </div>

      <h4 className="mb-3">Món nổi bật</h4>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3 mb-4">
        {featuredItems.map(item => (
          <div className="col" key={item.id}>
            <MenuItem item={item} />
          </div>
        ))}
      </div>

      <div className="text-center">
        <Link to="/menu" className="btn btn-outline-primary">Xem toàn bộ thực đơn</Link>
      </div>

    </div>
  )
}
