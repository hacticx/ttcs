import { useCart } from '../context/CartContext.jsx'

// Component này nhận 1 món ăn (item) và hiển thị dạng card
export default function MenuItem({ item }) {
  const { addToCart } = useCart()

  return (
    <div className="card h-100">

      {/* Ảnh món ăn */}
      <img
        src={item.image}
        className="card-img-top"
        alt={item.name}
        style={{ height: '180px', objectFit: 'cover' }}
      />

      <div className="card-body d-flex flex-column">
        {/* Tên và danh mục */}
        <div className="d-flex justify-content-between align-items-start mb-1">
          <h6 className="card-title mb-0">{item.name}</h6>
          <span className="badge bg-secondary text-capitalize">{item.category}</span>
        </div>

        {/* Mô tả ngắn */}
        <p className="card-text text-muted small flex-grow-1">{item.description}</p>

        {/* Giá + nút thêm vào giỏ */}
        <div className="d-flex justify-content-between align-items-center mt-2">
          <span className="fw-bold text-success">${item.price.toFixed(2)}</span>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => addToCart(item)}
          >
            + Thêm
          </button>
        </div>
      </div>

    </div>
  )
}
