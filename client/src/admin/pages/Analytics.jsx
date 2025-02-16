import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line,Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faShoppingCart,
  faUsers,
  faDollarSign,
  faBoxes,
  faChartPie,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    startDate: moment().subtract(30, "days").toDate(),
    endDate: new Date(),
  });

  useEffect(() => {
    fetchAnalytics();
  }, [dateRange]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const formattedStartDate = moment(dateRange.startDate).format("YYYY-MM-DD");
      const formattedEndDate = moment(dateRange.endDate).format("YYYY-MM-DD");

      const response = await axios.get(
        `https://shopease-appli.onrender.com/api/analytics?startDate=${formattedStartDate}&endDate=${formattedEndDate}`
      );
      console.log("Analytics Data:", response.data);
      setAnalytics(response.data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      toast.error("Failed to fetch analytics data");
    } finally {
      setLoading(false);
    }
  };

  const handleDateRangeChange = (e) => {
    const { name, value } = e.target;
    setDateRange((prev) => ({ ...prev, [name]: new Date(value) }));
  };

  const formatDate = (dateString) => {
    return moment(dateString).format("MMMM D, YYYY");
  };

  const calculatePercentageChange = (current, previous) => {
    if (previous === 0) {
      return current === 0 ? 0 : Infinity;
    }
    return ((current - previous) / previous) * 100;
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          ShopEase Analytics Dashboard
        </h2>

        {/* Date Range Picker */}
        <div className="flex space-x-4 items-center">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Start Date:
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={moment(dateRange.startDate).format("YYYY-MM-DD")}
              onChange={handleDateRangeChange}
            />
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              End Date:
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={moment(dateRange.endDate).format("YYYY-MM-DD")}
              onChange={handleDateRangeChange}
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center text-lg text-gray-700 dark:text-gray-300">
          <FontAwesomeIcon icon={faChartLine} className="animate-spin mr-2" />
          Loading analytics...
        </div>
      ) : !analytics ? (
        <div className="text-center text-lg text-gray-700 dark:text-gray-300">No analytics data available.</div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Sales */}
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 flex items-center justify-between">
              <div>
                <dt className="text-base font-semibold text-gray-900 dark:text-gray-100">Total Sales</dt>
                <dd className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
                  Ksh {analytics?.totalSales ? analytics.totalSales.toFixed(2) : "0.00"}
                </dd>
                {analytics?.previousPeriodTotalSales !== undefined && (
                  <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Compared to last period:
                    <span
                      className={
                        calculatePercentageChange(analytics.totalSales, analytics.previousPeriodTotalSales) >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {calculatePercentageChange(analytics.totalSales, analytics.previousPeriodTotalSales).toFixed(
                        2
                      )}
                      %
                    </span>
                  </div>
                )}
              </div>
              <div className="rounded-md bg-indigo-50 dark:bg-indigo-900 p-3">
                <FontAwesomeIcon icon={faDollarSign} className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>

            {/* Total Orders */}
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 flex items-center justify-between">
              <div>
                <dt className="text-base font-semibold text-gray-900 dark:text-gray-100">Total Orders</dt>
                <dd className="text-3xl font-extrabold text-green-600 dark:text-green-400">
                  {analytics?.totalOrders ?? 0}
                </dd>
                {analytics?.previousPeriodTotalOrders !== undefined && (
                  <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Compared to last period:
                    <span
                      className={
                        calculatePercentageChange(analytics.totalOrders, analytics.previousPeriodTotalOrders) >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {calculatePercentageChange(analytics.totalOrders, analytics.previousPeriodTotalOrders).toFixed(
                        2
                      )}
                      %
                    </span>
                  </div>
                )}
              </div>
              <div className="rounded-md bg-green-50 dark:bg-green-900 p-3">
                <FontAwesomeIcon icon={faShoppingCart} className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>

            {/* New Customers */}
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 flex items-center justify-between">
              <div>
                <dt className="text-base font-semibold text-gray-900 dark:text-gray-100">New Customers</dt>
                <dd className="text-3xl font-extrabold text-purple-600 dark:text-purple-400">
                  {analytics?.newCustomers ?? 0}
                </dd>
                {analytics?.previousPeriodNewCustomers !== undefined && (
                  <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Compared to last period:
                    <span
                      className={
                        calculatePercentageChange(analytics.newCustomers, analytics.previousPeriodNewCustomers) >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {calculatePercentageChange(
                        analytics.newCustomers,
                        analytics.previousPeriodNewCustomers
                      ).toFixed(2)}
                      %
                    </span>
                  </div>
                )}
              </div>
              <div className="rounded-md bg-purple-50 dark:bg-purple-900 p-3">
                <FontAwesomeIcon icon={faUsers} className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>

            {/* Total Products Sold */}
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 flex items-center justify-between">
              <div>
                <dt className="text-base font-semibold text-gray-900 dark:text-gray-100">Products Sold</dt>
                <dd className="text-3xl font-extrabold text-yellow-600 dark:text-yellow-400">
                  {analytics?.totalProductsSold ?? 0}
                </dd>
                {analytics?.previousPeriodTotalProductsSold !== undefined && (
                  <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Compared to last period:
                    <span
                      className={
                        calculatePercentageChange(
                          analytics.totalProductsSold,
                          analytics.previousPeriodTotalProductsSold
                        ) >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {calculatePercentageChange(
                        analytics.totalProductsSold,
                        analytics.previousPeriodTotalProductsSold
                      ).toFixed(2)}
                      %
                    </span>
                  </div>
                )}
              </div>
              <div className="rounded-md bg-yellow-50 dark:bg-yellow-900 p-3">
                <FontAwesomeIcon icon={faBoxes} className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </div>

          {/* Charts and Detailed Lists */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sales Trends Chart */}
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
              <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">Sales Trends</h3>
              {analytics?.salesTrends?.length > 0 ? (
                <Line
                  data={{
                    labels: analytics.salesTrends.map((trend) => formatDate(trend._id)),
                    datasets: [
                      {
                        label: "Daily Sales (Ksh)",
                        data: analytics.salesTrends.map((trend) => trend.dailySales),
                        borderColor: "rgba(54, 162, 235, 1)",
                        backgroundColor: "rgba(54, 162, 235, 0.2)",
                        fill: true,
                        tension: 0.4,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        display: true,
                        position: "top",
                      },
                      title: {
                        display: false, // No title here, already in h3
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          color: "#6B7280",
                        },
                      },
                      x: {
                        ticks: {
                          color: "#6B7280",
                        },
                      },
                    },
                  }}
                />
              ) : (
                <p className="text-gray-600 dark:text-gray-400">No sales trend data available.</p>
              )}
            </div>

            {/* Orders by Status Pie Chart */}
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
              <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">Orders by Status</h3>
              {analytics?.ordersByStatus?.length > 0 ? (
                <div className="flex items-center justify-center">
                  <PieChart data={analytics.ordersByStatus} />
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">No orders found.</p>
              )}
            </div>

            {/* Top Selling Products */}
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
              <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">Top Selling Products</h3>
              {analytics?.topSellingProducts?.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
                        >
                          Product ID
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
                        >
                          Total Sold
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {analytics.topSellingProducts.map((product) => (
                        <tr key={product._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                            {product._id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            {product.totalSold}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">No top-selling products found.</p>
              )}
            </div>

            {/* Recent Orders List */}
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
              <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">Recent Orders</h3>
              {analytics?.recentOrders?.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
                        >
                          Order ID
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
                        >
                          Customer ID
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
                        >
                          Order Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
                        >
                          Total Amount
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {analytics.recentOrders.map((order) => (
                        <tr key={order._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                            {order._id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            {order.customerId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            {formatDate(order.orderDate)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            {order.totalAmount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            {order.status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">No recent orders found.</p>
              )}
            </div>
          </div>

        </>
      )}
    </div>
  );
};

// Pie Chart Component (Reusable)
const PieChart = ({ data }) => {
  const colors = ["#1E3A8A", "#3B82F6", "#60A5FA", "#93C5FD", "#DBEAFE"]; // Indigo shades
  const backgroundColors = data.map((_, index) => colors[index % colors.length]);

  const chartData = {
    labels: data.map((item) => item._id),
    datasets: [
      {
        data: data.map((item) => item.count),
        backgroundColor: backgroundColors,
        hoverBackgroundColor: backgroundColors.map((color) => color.replace("A", "F")), // Make hover color more opaque
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "#6B7280", // Darker text color
        },
      },
      title: {
        display: false,
      },
    },
  };

  return <Doughnut data={chartData} options={chartOptions} />;
};

export default Analytics;
