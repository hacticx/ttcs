import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { AuthProvider }  from './context/AuthContext.jsx'
import { CartProvider }  from './context/CartContext.jsx'
import { OrderProvider } from './context/OrderContext.jsx'

import Navbar  from './components/Navbar.jsx'
import Home    from './pages/Home.jsx'
import Menu    from './pages/Menu.jsx'
import Cart    from './pages/Cart.jsx'
import Orders  from './pages/Orders.jsx'
import Login   from './pages/Login.jsx'
import Profile from './pages/Profile.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <OrderProvider>

            <Navbar />

            <div className="container mt-4">
              <Routes>
                <Route path="/"        element={<Home />}    />
                <Route path="/menu"    element={<Menu />}    />
                <Route path="/cart"    element={<Cart />}    />
                <Route path="/orders"  element={<Orders />}  />
                <Route path="/login"   element={<Login />}   />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </div>

          </OrderProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
