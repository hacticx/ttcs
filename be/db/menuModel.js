const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  description: { type: String, default: "" },
  price:       { type: Number, required: true },
  category:    { type: String, required: true },
  image:       { type: String, default: "" },
  available:   { type: Boolean, default: true },
  created_at:  { type: Date, default: Date.now },
});

const MenuItem = mongoose.models.MenuItems || mongoose.model("MenuItems", menuItemSchema);

module.exports = MenuItem;
