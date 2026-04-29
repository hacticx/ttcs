const express = require("express");
const bcrypt  = require("bcrypt");
const User    = require("../db/userModel.js");
const router  = express.Router();

/**
 * POST /api/auth/register
 * Đăng ký tài khoản mới
 * Body: { first_name, last_name, email, password }
 */
router.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    // Kiểm tra thiếu field
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ error: "Vui long dien day du thong tin." });
    }

    // Kiểm tra email đã tồn tại chưa
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email nay da duoc su dung." });
    }

    // Hash mật khẩu trước khi lưu (10 = độ phức tạp của bcrypt)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo user mới
    const user = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });

    await user.save();
    console.log("New user registered:", email);

    res.status(201).json({
      message: "Dang ky thanh cong!",
      user: {
        _id:        user._id,
        first_name: user.first_name,
        last_name:  user.last_name,
        email:      user.email,
        role:       user.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: "Loi server khi dang ky." });
  }
});

/**
 * POST /api/auth/login
 * Đăng nhập
 * Body: { email, password }
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Vui long nhap email va mat khau." });
    }

    // Tìm user theo email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Email khong ton tai." });
    }

    // So sánh mật khẩu với hash trong DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Mat khau khong dung." });
    }

    // Lưu thông tin user vào session (không lưu password)
    req.session.user = {
      _id:        user._id,
      first_name: user.first_name,
      last_name:  user.last_name,
      email:      user.email,
      role:       user.role,
    };

    console.log("User logged in:", email);

    res.json({
      message: "Dang nhap thanh cong!",
      user: req.session.user,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Loi server khi dang nhap." });
  }
});

/**
 * POST /api/auth/logout
 * Đăng xuất — xoá session
 */
router.post("/logout", (req, res) => {
  const email = req.session.user?.email;
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Khong the dang xuat." });
    }
    console.log("User logged out:", email);
    res.json({ message: "Da dang xuat." });
  });
});

/**
 * GET /api/auth/me
 * Lấy thông tin user đang đăng nhập (dùng khi frontend reload trang)
 */
router.get("/me", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Chua dang nhap." });
  }
  res.json({ user: req.session.user });
});

module.exports = router;
