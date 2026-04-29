import { useCart } from '../context/CartContext.jsx'

export default function MenuItem({ item }) {
  const { addToCart } = useCart()

  return (
    <div className="card h-100">

      <img
        src={item.image}
        className="card-img-top"
        alt={item.name}
        style={{ height: '180px', objectFit: 'cover' }}
      />

      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-1">
          <h6 className="card-title mb-0">{item.name}</h6>
          <span className="badge bg-secondary text-capitalize">{item.category}</span>
        </div>

        <p className="card-text text-muted small flex-grow-1">{item.description}</p>
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
