import { createContext, useContext, useState } from 'react'

const OrderContext = createContext(null)

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([])
<<<<<<< HEAD

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

=======
  // orders là mảng các đơn hàng
  // Mỗi đơn: { id, userId, items, total, status, createdAt }

  // Thêm đơn mới sau khi checkout
  function placeOrder(orderData) {
    const newOrder = {
      id: Date.now().toString(), // tạm dùng timestamp làm id
      ...orderData,
      status: 'pending',          // trạng thái ban đầu
      createdAt: new Date().toLocaleString('vi-VN'),
    }
    setOrders(prev => [newOrder, ...prev]) // mới nhất lên đầu
    return newOrder
  }

  // Admin đổi trạng thái đơn hàng
>>>>>>> f5204efff5c69eaf41d1c7f86687d02c7e48271a
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
