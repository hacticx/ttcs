const mongoose = require("mongoose");

/**
 * Schema cho người dùng (User)
 */
const userSchema = new mongoose.Schema({
  // Tên
  first_name: { type: String, required: true },
  // Họ
  last_name:  { type: String, required: true },
  // Email — dùng để đăng nhập, không được trùng
  email:      { type: String, required: true, unique: true },
  // Mật khẩu đã được hash bằng bcrypt (KHÔNG lưu mật khẩu thô)
  password:   { type: String, required: true },
  // Phân quyền: "user" hoặc "admin"
  role:       { type: String, default: "user" },
  // Số điện thoại (tuỳ chọn)
  phone:      { type: String, default: "" },
  // Địa chỉ mặc định (tuỳ chọn)
  address:    { type: String, default: "" },
  // Ngày tạo tài khoản
  created_at: { type: Date, default: Date.now },
});

const User = mongoose.models.Users || mongoose.model("Users", userSchema);

module.exports = User;
