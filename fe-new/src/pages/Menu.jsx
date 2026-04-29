import { useState } from 'react'
import menuItems from '../data/menuData.js'
import MenuItem from '../components/MenuItem.jsx'

const CATEGORIES = ['all', 'burger', 'pizza', 'chicken', 'sides', 'drinks']

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = menuItems.filter(item => {
    const matchCategory = activeCategory === 'all' || item.category === activeCategory
    const matchSearch   = item.name.toLowerCase().includes(search.toLowerCase())
    return matchCategory && matchSearch
  })

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
            onClick={() => setActiveCategory(cat)}
          >
            {cat === 'all' ? 'Tất cả' : cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted">Không tìm thấy món nào.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
          {filtered.map(item => (
            <div className="col" key={item.id}>
              <MenuItem item={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
