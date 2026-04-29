/**
 * Dữ liệu mẫu để load vào MongoDB lần đầu
 * Tương tự models.js trong mẫu đề bài
 */

function menuListModel() {
  return [
    {
      name: "Classic Burger",
      description: "Bánh mì kẹp thịt bò, rau xà lách, cà chua, sốt đặc biệt",
      price: 8.99,
      category: "burger",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80",
      available: true,
    },
    {
      name: "Cheese Burger",
      description: "Burger với lớp phô mai cheddar tan chảy bên trong",
      price: 10.99,
      category: "burger",
      image: "https://images.unsplash.com/photo-1550317138-10000687a72b?w=400&q=80",
      available: true,
    },
    {
      name: "Pepperoni Pizza",
      description: "Pizza pepperoni với phô mai mozzarella kéo dài",
      price: 12.99,
      category: "pizza",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80",
      available: true,
    },
    {
      name: "Margherita Pizza",
      description: "Pizza cà chua tươi, húng quế và mozzarella",
      price: 11.99,
      category: "pizza",
      image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80",
      available: true,
    },
    {
      name: "Gà rán giòn",
      description: "4 miếng gà rán giòn tan, thơm ngon, kèm sốt cay",
      price: 9.99,
      category: "chicken",
      image: "https://images.unsplash.com/photo-1619985632461-f33748ef4f9a?w=400&q=80",
      available: true,
    },
    {
      name: "Khoai tây chiên",
      description: "Khoai tây chiên vàng giòn với muối biển",
      price: 3.99,
      category: "sides",
      image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80",
      available: true,
    },
    {
      name: "Coca Cola",
      description: "Nước ngọt có ga lon 500ml, phục vụ lạnh",
      price: 2.49,
      category: "drinks",
      image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&q=80",
      available: true,
    },
    {
      name: "Sinh tố Chocolate",
      description: "Sinh tố sô-cô-la đậm đà, béo ngậy",
      price: 4.99,
      category: "drinks",
      image: "https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=400&q=80",
      available: true,
    },
  ];
}

function userListModel() {
  return [
    {
      name: "Nguyễn Văn A",
      email: "a@gmail.com",
      // Mật khẩu "123456" — sẽ được hash trong dbLoad.js
      password: "123456",
      role: "user",
    },
    {
      name: "Trần Thị B",
      email: "b@gmail.com",
      password: "123456",
      role: "user",
    },
    {
      name: "Admin FastBite",
      email: "admin@fastbite.com",
      password: "admin123",
      role: "admin",
    },
  ];
}

module.exports = { menuListModel, userListModel };
