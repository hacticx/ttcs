const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  menu_item_id: mongoose.Schema.Types.ObjectId,
  name:         { type: String, required: true },
  price:        { type: Number, required: true },
  quantity:     { type: Number, required: true, min: 1 },
});

const orderSchema = new mongoose.Schema({
  user_id:      { type: mongoose.Schema.Types.ObjectId, required: true },
  user_name:    { type: String, required: true },
  items:        [orderItemSchema],
  total:        { type: Number, required: true },
  status:       { type: String, default: "pending" },
  customer_name: { type: String, required: true },
  phone:         { type: String, required: true },
  address:       { type: String, required: true },
  note:          { type: String, default: "" },
  created_at:    { type: Date, default: Date.now },
});

const Order = mongoose.models.Orders || mongoose.model("Orders", orderSchema);

module.exports = Order;
