const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product");

exports.getAnalytics = async (req, res) => {
  try {
    // Total Sales (Revenue)
    const totalSales = await Order.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: "$orderTotal" } } },
    ]);

    // Total Orders
    const totalOrders = await Order.countDocuments();

    // Orders by Status
    const ordersByStatus = await Order.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    // Top-Selling Products
    const topSellingProducts = await Order.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.productId",
          totalSold: { $sum: "$items.quantity" },
        },
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 },
    ]);

    // New Customers
    const newCustomers = await User.countDocuments({
      createdAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 30)) },
    });

    // Sales Trends (Daily, Weekly, Monthly)
    const salesTrends = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          dailySales: { $sum: "$orderTotal" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      totalSales: totalSales[0]?.totalRevenue || 0,
      totalOrders,
      ordersByStatus,
      topSellingProducts,
      newCustomers,
      salesTrends,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ message: "Failed to fetch analytics data" });
  }
};
