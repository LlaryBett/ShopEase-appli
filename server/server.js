const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes'); // ✅ Import order routes
const analyticsRoutes = require('./routes/analyticsRoutes'); // ✅ Import analytics routes
const addressRoutes = require("./routes/addressRoutes"); // Import 
// Load environment variables
dotenv.config();

const app = express();

// ✅ Fix CORS Middleware (Corrected Syntax)
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Middleware to parse JSON bodies
app.use(express.json());

// ✅ MongoDB Connection with Error Handling
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process if connection fails
  }
};
connectDB();

// ✅ Use Routes
app.use('/api/auth', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes); // ✅ Add Order Routes
app.use('/api/analytics', analyticsRoutes); // ✅ Add Analytics Routes
app.use("/api/addresses", addressRoutes); // Use address routes

// Define a test route
app.get('/', (req, res) => {
  res.send('Welcome to the ShopEase server!');
});

// Error Handling Middleware for Undefined Routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
