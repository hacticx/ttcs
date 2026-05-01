const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name:  { type: String, required: true },
  email:      { type: String, required: true, unique: true },
  password:   { type: String, required: true },
  role:       { type: String, default: "user" },
  phone:      { type: String, default: "" },
  address:    { type: String, default: "" },
  created_at: { type: Date, default: Date.now },
});

const User = mongoose.models.Users || mongoose.model("Users", userSchema);

module.exports = User;
