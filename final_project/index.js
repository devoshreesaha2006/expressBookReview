const express = require("express");
const jwt = require("jsonwebtoken");
const customerRoutes = require("./router/auth_users").authenticated;
const generalRoutes = require("./router/general").general;

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "access";

app.use(express.json());

app.use("/customer/auth", (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: "Authentication required" });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.username = decoded.username;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
});

app.use("/customer", customerRoutes);
app.use("/", generalRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

module.exports = app;
