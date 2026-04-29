const express = require("express");
const Order   = require("../db/orderModel.js");
const { requireLogin, requireAdmin } = require("../middleware/requireLogin.js");
const router  = express.Router();

router.get("/", requireLogin, async (req, res) => {
  try {
    const user = req.session.user;

    let orders;
    if (user.role === "admin") {
      orders = await Order.find().sort({ created_at: -1 });
    } else {
      orders = await Order.find({ user_id: user._id }).sort({ created_at: -1 });
    }

    res.json(orders);
  } catch (error) {
    console.error("Get orders error:", error);
    res.status(500).json({ error: "Loi khi lay danh sach don hang." });
  }
});

router.get("/:id", requireLogin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ error: "Khong tim thay don hang." });
    }

    const user = req.session.user;
    if (user.role !== "admin" && order.user_id.toString() !== user._id.toString()) {
      return res.status(403).json({ error: "Khong co quyen xem don hang nay." });
    }

    res.json(order);
  } catch (error) {
    res.status(400).json({ error: "ID khong hop le." });
  }
});

router.post("/", requireLogin, async (req, res) => {
  try {
    const { items, total, customer_name, phone, address, note } = req.body;
    const user = req.session.user;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "Don hang trong, khong co mon nao." });
    }
    if (!customer_name || !phone || !address) {
      return res.status(400).json({ error: "Thieu thong tin giao hang." });
    }

    const order = new Order({
      user_id:       user._id,
      user_name:     user.first_name + " " + user.last_name,
      items,
      total,
      customer_name,
      phone,
      address,
      note: note || "",
    });

    await order.save();
    console.log("New order created by:", user.email, "- Total:", total);

    res.status(201).json({ message: "Dat hang thanh cong!", order });
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ error: "Loi khi tao don hang." });
  }
});

router.put("/:id/status", requireLogin, requireAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["pending", "preparing", "delivering", "done", "cancelled"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Trang thai khong hop le." });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: "Khong tim thay don hang." });
    }

    console.log("Order", req.params.id, "status updated to:", status);
    res.json({ message: "Cap nhat trang thai thanh cong!", order });
  } catch (error) {
    res.status(400).json({ error: "Loi khi cap nhat trang thai." });
  }
});

router.delete("/:id", requireLogin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    const user  = req.session.user;

    if (!order) {
      return res.status(404).json({ error: "Khong tim thay don hang." });
    }

    if (user.role !== "admin" && order.user_id.toString() !== user._id.toString()) {
      return res.status(403).json({ error: "Khong co quyen huy don hang nay." });
    }

    if (user.role !== "admin" && order.status !== "pending") {
      return res.status(400).json({ error: "Khong the huy don hang dang xu ly." });
    }

    await Order.findByIdAndUpdate(req.params.id, { status: "cancelled" });
    res.json({ message: "Da huy don hang." });
  } catch (error) {
    res.status(400).json({ error: "Loi khi huy don hang." });
  }
});

module.exports = router;
