import { useState, useEffect } from 'react'
import { apiGet } from '../api.js'
import MenuItem from '../components/MenuItem.jsx'

const CATEGORIES = ['all', 'burger', 'pizza', 'chicken', 'sides', 'drinks']

export default function Menu() {
  const [items, setItems]               = useState([])
  const [activeCategory, setCategory]   = useState('all')
  const [search, setSearch]             = useState('')
  const [loading, setLoading]           = useState(true)
  const [error, setError]               = useState('')

  useEffect(() => {
    apiGet("/menu")
      .then(data => setItems(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const filtered = items.filter(item => {
    const matchCat    = activeCategory === 'all' || item.category === activeCategory
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  if (loading) return <p>Đang tải thực đơn...</p>
  if (error)   return <p className="text-danger">{error}</p>

  return (
    <div>
      <h3 className="mb-3">Thực đơn</h3>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Tìm kiếm món ăn..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="d-flex gap-2 flex-wrap mb-4">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`btn btn-sm ${activeCategory === cat ? 'btn-dark' : 'btn-outline-dark'}`}
            onClick={() => setCategory(cat)}
          >
            {cat === 'all' ? 'Tất cả' : cat}
          </button>
        ))}
      </div>

      <div className="row row-cols-1 row-cols-md-3 g-3">
        {filtered.map(item => (
          <div className="col" key={item._id}>
            <MenuItem item={item} />
          </div>
        ))}
      </div>
    </div>
  )
}