const express = require("express");
const session = require("express-session");
const cors    = require("cors");
require("dotenv").config();
const dbConnect   = require("./db/dbConnect.js");
const authRouter  = require("./routes/authRouter.js");
const menuRouter  = require("./routes/menuRouter.js");
const orderRouter = require("./routes/orderRouter.js");
const app  = express();
const port = process.env.PORT || 3000;

dbConnect();
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,
}));
app.use(express.json());

app.use(session({
  secret:            process.env.SESSION_SECRET,
  resave:            false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true, 
    maxAge:   7 * 24 * 60 * 60 * 1000,
  },
}));

app.use("/api/auth",   authRouter);
app.use("/api/menu",   menuRouter);
app.use("/api/orders", orderRouter);

app.get("/", (req, res) => {
  res.json({ message: "ServerAPI dang chay!", port: port });
});

app.listen(port, () => {
  console.log(`Server dang chay tai http://localhost:${port}`);

});
