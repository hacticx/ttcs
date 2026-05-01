const express  = require("express");
const MenuItem = require("../db/menuModel.js");
const { requireLogin, requireAdmin } = require("../middleware/requireLogin.js");
const router   = express.Router();

router.get("/", async (req, res) => {
  try {
    const filter = { available: true };

    if (req.query.category) {
      filter.category = req.query.category;
    }

    const items = await MenuItem.find(filter);
    res.json(items);
  } catch (error) {
    console.error("Get menu error:", error);
    res.status(500).json({ error: "Loi khi lay menu." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Khong tim thay mon an." });
    }
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: "ID khong hop le." });
  }
});

router.post("/", requireLogin, requireAdmin, async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ error: "Thieu ten, gia hoac danh muc." });
    }

    const item = new MenuItem({ name, description, price, category, image });
    await item.save();

    console.log("Admin added menu item:", name);
    res.status(201).json({ message: "Them mon an thanh cong!", item });
  } catch (error) {
    console.error("Add menu error:", error);
    res.status(500).json({ error: "Loi khi them mon an." });
  }
});

router.put("/:id", requireLogin, requireAdmin, async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!item) {
      return res.status(404).json({ error: "Khong tim thay mon an." });
    }
    res.json({ message: "Cap nhat thanh cong!", item });
  } catch (error) {
    res.status(400).json({ error: "Loi khi cap nhat." });
  }
});

router.delete("/:id", requireLogin, requireAdmin, async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { available: false },
      { new: true }
    );
    if (!item) {
      return res.status(404).json({ error: "Khong tim thay mon an." });
    }
    console.log("Admin hid menu item:", item.name);
    res.json({ message: "Da an mon an khoi menu." });
  } catch (error) {
    res.status(400).json({ error: "Loi khi xoa mon an." });
  }
});

module.exports = router;
