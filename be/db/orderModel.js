const mongoose = require("mongoose");

/**
 * Schema cho từng món trong đơn hàng
 */
const orderItemSchema = new mongoose.Schema({
  // ID của món ăn (tham chiếu tới MenuItems)
  menu_item_id: mongoose.Schema.Types.ObjectId,
  // Tên món (lưu lại để không bị ảnh hưởng nếu menu thay đổi)
  name:         { type: String, required: true },
  // Giá tại thời điểm đặt hàng
  price:        { type: Number, required: true },
  // Số lượng
  quantity:     { type: Number, required: true, min: 1 },
});

/**
 * Schema cho đơn hàng (Order)
 */
const orderSchema = new mongoose.Schema({
  // ID người đặt hàng (tham chiếu tới Users)
  user_id:      { type: mongoose.Schema.Types.ObjectId, required: true },
  // Tên người đặt (lưu lại để dễ hiển thị)
  user_name:    { type: String, required: true },
  // Danh sách món trong đơn
  items:        [orderItemSchema],
  // Tổng tiền
  total:        { type: Number, required: true },
  // Trạng thái đơn hàng
  // pending → preparing → delivering → done (hoặc cancelled)
  status:       { type: String, default: "pending" },
  // Thông tin giao hàng
  customer_name: { type: String, required: true },
  phone:         { type: String, required: true },
  address:       { type: String, required: true },
  // Ghi chú thêm (tuỳ chọn)
  note:          { type: String, default: "" },
  // Thời điểm đặt hàng
  created_at:    { type: Date, default: Date.now },
});

const Order = mongoose.models.Orders || mongoose.model("Orders", orderSchema);

module.exports = Order;
