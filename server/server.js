const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const addressRoutes = require("./routes/addressRoutes");

dotenv.config();
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://shop-ease-appli.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Middleware to parse JSON and log incoming requests
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// 🟢 Log incoming requests for debugging
app.use((req, res, next) => {
  console.log(`🔵 Incoming Request: ${req.method} ${req.originalUrl}`);
  console.log("Headers:", req.headers);

  if (req.method !== "GET") {
    console.log("Body:", req.body);
  }

  next();
});

// 🛠 Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};
connectDB();

// 🛠 Register API Routes
app.use("/api/auth", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/addresses", addressRoutes);

// 🛠 Test Route
app.get("/", (req, res) => {
  res.send("Welcome to the ShopEase server!");
});

// 🛠 Catch-all for undefined routes
app.use((req, res) => {
  console.log(`🔴 404 Not Found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ message: "Route not found" });
});

// 🛠 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
