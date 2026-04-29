function requireLogin(req, res, next) {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ error: "Chua dang nhap. Vui long dang nhap." });
  }
  next();
}

function requireAdmin(req, res, next) {
  if (req.session.user.role !== "admin") {
    return res.status(403).json({ error: "Khong co quyen. Chi admin moi duoc phep." });
  }
  next();
}

module.exports = { requireLogin, requireAdmin };
