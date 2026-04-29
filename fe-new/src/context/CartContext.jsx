import { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
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

  function removeFromCart(itemId) {
    setCart(prev => prev.filter(i => i.id !== itemId))
  }

  function updateQuantity(itemId, quantity) {
    if (quantity <= 0) return removeFromCart(itemId)
    setCart(prev => prev.map(i => i.id === itemId ? { ...i, quantity } : i))
  }

  function clearCart() {
    setCart([])
  }

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0)

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
