import { createContext, useContext, useState } from 'react'
import api from '../api.js'

const OrderContext = createContext(null)

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([])

  async function fetchOrders() {
    const data = await api.get("/orders")
    setOrders(data)
  }

  // Đặt hàng mới
  async function placeOrder(orderData) {
    const data = await api.post("/orders", orderData)
    setOrders(prev => [data.order, ...prev])
    return data.order
  }

  // Admin đổi trạng thái
  async function updateStatus(orderId, newStatus) {
    await api.put(`/orders/${orderId}/status`, { status: newStatus })
    setOrders(prev =>
      prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o)
    )
  }

  // Huỷ đơn
  async function cancelOrder(orderId) {
    await api.delete(`/orders/${orderId}`)
    setOrders(prev =>
      prev.map(o => o._id === orderId ? { ...o, status: "cancelled" } : o)
    )
  }

  return (
    <OrderContext.Provider value={{ orders, fetchOrders, placeOrder, updateStatus, cancelOrder }}>
      {children}
    </OrderContext.Provider>
  )
}

export function useOrders() {
  return useContext(OrderContext)
}