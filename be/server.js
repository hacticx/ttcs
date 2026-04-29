const express = require("express");
const session = require("express-session");
const cors    = require("cors");
require("dotenv").config();

const dbConnect   = require("./db/dbConnect.js");
const authRouter  = require("./routes/authRouter.js");
const menuRouter  = require("./routes/menuRouter.js");
const orderRouter = require("./routes/orderRouter.js");

const app  = express();
const PORT = process.env.PORT || 3000;

// ─── Kết nối database ──────────────────────────────────────────────────────────
dbConnect();

// ─── Middleware cơ bản ─────────────────────────────────────────────────────────

// Cho phép frontend (React) ở port khác gọi API
app.use(cors({
  origin: "http://localhost:5173", // địa chỉ frontend Vite
  credentials: true,               // cho phép gửi cookie/session
}));

// Đọc JSON từ body của request
app.use(express.json());

// Cấu hình session — lưu trạng thái đăng nhập
app.use(session({
  secret:            process.env.SESSION_SECRET,
  resave:            false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,  // JS frontend không đọc được cookie (bảo mật)
    maxAge:   7 * 24 * 60 * 60 * 1000, // hết hạn sau 7 ngày
  },
}));

// ─── Đăng ký các router ────────────────────────────────────────────────────────
// Mỗi router xử lý 1 nhóm route
// authRouter:  /api/auth/login, /api/auth/register, /api/auth/logout, /api/auth/me
// menuRouter:  /api/menu, /api/menu/:id
// orderRouter: /api/orders, /api/orders/:id, /api/orders/:id/status

app.use("/api/auth",   authRouter);
app.use("/api/menu",   menuRouter);
app.use("/api/orders", orderRouter);

// ─── Route test ────────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ message: "FastBite API dang chay!", port: PORT });
});

// ─── Khởi động server ──────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Server dang chay tai http://localhost:${PORT}`);
  console.log("Cac route co san:");
  console.log("  POST /api/auth/register");
  console.log("  POST /api/auth/login");
  console.log("  POST /api/auth/logout");
  console.log("  GET  /api/auth/me");
  console.log("  GET  /api/menu");
  console.log("  GET  /api/menu/:id");
  console.log("  POST /api/menu         (admin)");
  console.log("  PUT  /api/menu/:id     (admin)");
  console.log("  DELETE /api/menu/:id   (admin)");
  console.log("  GET  /api/orders");
  console.log("  POST /api/orders");
  console.log("  PUT  /api/orders/:id/status  (admin)");
  console.log("  DELETE /api/orders/:id");
});
