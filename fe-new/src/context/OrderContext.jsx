import { createContext, useContext, useState } from 'react'

const OrderContext = createContext(null)

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([])

  function placeOrder(orderData) {
    const newOrder = {
      id: Date.now().toString(),
      ...orderData,
      status: 'pending', 
      createdAt: new Date().toLocaleString('vi-VN'),
    }
    setOrders(prev => [newOrder, ...prev])
    return newOrder
  }

  function updateStatus(orderId, newStatus) {
    setOrders(prev =>
      prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o)
    )
  }

  return (
    <OrderContext.Provider value={{ orders, placeOrder, updateStatus }}>
      {children}
    </OrderContext.Provider>
  )
}

export function useOrders() {
  return useContext(OrderContext)
}
