const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcrypt");

const User     = require("./userModel.js");
const MenuItem = require("./menuModel.js");
const Order    = require("./orderModel.js");

// ─── Dữ liệu mẫu ──────────────────────────────────────────────────────────────

const sampleUsers = [
  {
    first_name: "Nguyen Van",
    last_name:  "A",
    email:      "a@gmail.com",
    password:   "123456",   // sẽ được hash trước khi lưu
    role:       "user",
    phone:      "0901234567",
    address:    "123 Đường ABC, Hà Nội",
  },
  {
    first_name: "Tran Thi",
    last_name:  "B",
    email:      "b@gmail.com",
    password:   "123456",
    role:       "user",
    phone:      "0912345678",
    address:    "456 Đường XYZ, TP.HCM",
  },
  {
    first_name: "Admin",
    last_name:  "FastBite",
    email:      "admin@fastbite.com",
    password:   "admin123",
    role:       "admin",
    phone:      "0999999999",
    address:    "FastBite HQ",
  },
];

const sampleMenu = [
  {
    name:        "Classic Burger",
    description: "Bánh mì kẹp thịt bò, rau xà lách, cà chua, sốt đặc biệt",
    price:       8.99,
    category:    "burger",
    image:       "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80",
  },
  {
    name:        "Cheese Burger",
    description: "Burger với lớp phô mai cheddar tan chảy bên trong",
    price:       10.99,
    category:    "burger",
    image:       "https://images.unsplash.com/photo-1550317138-10000687a72b?w=400&q=80",
  },
  {
    name:        "Pepperoni Pizza",
    description: "Pizza pepperoni với phô mai mozzarella kéo dài",
    price:       12.99,
    category:    "pizza",
    image:       "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80",
  },
  {
    name:        "Margherita Pizza",
    description: "Pizza cà chua tươi, húng quế và mozzarella",
    price:       11.99,
    category:    "pizza",
    image:       "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80",
  },
  {
    name:        "Gà rán giòn",
    description: "4 miếng gà rán giòn tan, thơm ngon, kèm sốt cay",
    price:       9.99,
    category:    "chicken",
    image:       "https://images.unsplash.com/photo-1619985632461-f33748ef4f9a?w=400&q=80",
  },
  {
    name:        "Khoai tây chiên",
    description: "Khoai tây chiên vàng giòn với muối biển",
    price:       3.99,
    category:    "sides",
    image:       "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80",
  },
  {
    name:        "Coca Cola",
    description: "Nước ngọt có ga lon 500ml, phục vụ lạnh",
    price:       2.49,
    category:    "drinks",
    image:       "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&q=80",
  },
  {
    name:        "Sinh tố Chocolate",
    description: "Sinh tố sô-cô-la đậm đà, béo ngậy",
    price:       4.99,
    category:    "drinks",
    image:       "https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=400&q=80",
  },
];

// ─── Hàm chính ─────────────────────────────────────────────────────────────────

async function dbLoad() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Successfully connected to MongoDB Atlas!");
  } catch (error) {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error(error);
    return;
  }

  // Xoá dữ liệu cũ
  await User.deleteMany({});
  await MenuItem.deleteMany({});
  await Order.deleteMany({});
  console.log("Cleared old data.");

  // Thêm users — hash mật khẩu trước khi lưu
  for (const userData of sampleUsers) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = new User({ ...userData, password: hashedPassword });
    try {
      await user.save();
      console.log("Added user:", userData.email, "(role:", userData.role + ")");
    } catch (error) {
      console.error("Error creating user:", userData.email, error.message);
    }
  }

  // Thêm menu items
  for (const itemData of sampleMenu) {
    const item = new MenuItem(itemData);
    try {
      await item.save();
      console.log("Added menu item:", itemData.name);
    } catch (error) {
      console.error("Error creating menu item:", itemData.name, error.message);
    }
  }

  console.log("\n✅ Database loaded successfully!");
  console.log("Users:", sampleUsers.length);
  console.log("Menu items:", sampleMenu.length);
  mongoose.disconnect();
}

dbLoad();
