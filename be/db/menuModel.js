const mongoose = require("mongoose");

/**
 * Schema cho món ăn trong thực đơn (MenuItem)
 */
const menuItemSchema = new mongoose.Schema({
  // Tên món
  name:        { type: String, required: true },
  // Mô tả ngắn
  description: { type: String, default: "" },
  // Giá (USD)
  price:       { type: Number, required: true },
  // Danh mục: burger | pizza | chicken | sides | drinks | desserts
  category:    { type: String, required: true },
  // Đường dẫn ảnh (URL hoặc tên file trong /images)
  image:       { type: String, default: "" },
  // Có đang bán không (false = ẩn khỏi menu)
  available:   { type: Boolean, default: true },
  // Ngày thêm vào menu
  created_at:  { type: Date, default: Date.now },
});

const MenuItem = mongoose.models.MenuItems || mongoose.model("MenuItems", menuItemSchema);

module.exports = MenuItem;
