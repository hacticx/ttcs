import { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  // cart là mảng các món, mỗi món có thêm trường "quantity"
  // Ví dụ: [{ id:'1', name:'Burger', price:8.99, quantity:2 }, ...]

  // Thêm món: nếu đã có thì tăng quantity, chưa có thì thêm mới
  function addToCart(item) {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        return prev.map(i => i.id === item.id
          ? { ...i, quantity: i.quantity + 1 }
          : i
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  // Xóa 1 món khỏi giỏ
  function removeFromCart(itemId) {
    setCart(prev => prev.filter(i => i.id !== itemId))
  }

  // Thay đổi số lượng; nếu = 0 thì xóa luôn
  function updateQuantity(itemId, quantity) {
    if (quantity <= 0) return removeFromCart(itemId)
    setCart(prev => prev.map(i => i.id === itemId ? { ...i, quantity } : i))
  }

  // Xóa toàn bộ giỏ (sau khi đặt hàng)
  function clearCart() {
    setCart([])
  }

  // Tính tổng tiền
  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0)

  // Đếm tổng số lượng (hiển thị trên icon giỏ hàng)
  const itemCount = cart.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, total, itemCount }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
