import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CheckCircle, RefreshCw, XCircle, Search, Edit } from "lucide-react";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    const results = orders.filter((order) =>
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOrders(results);
  }, [searchTerm, orders]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/orders");
      setOrders(response.data);
      setFilteredOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders", { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = async (orderId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/orders/${orderId}`);
      setEditingOrder(response.data);
      setShowEditModal(true);
    } catch (error) {
      console.error("Error fetching order details:", error);
      toast.error("Failed to fetch order details", { position: "top-right" });
    }
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingOrder(null);
  };

  const updateOrder = async () => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${editingOrder._id}`, editingOrder);
      toast.success("Order updated successfully!", { position: "top-right" });
      fetchOrders();
      closeEditModal();
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Failed to update order", { position: "top-right" });
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${id}`, { status });
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order._id === id ? { ...order, status } : order))
      );
      toast.success(`Order status updated to ${status}!`, { position: "top-right" });
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update status", { position: "top-right" });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer position="top-right" autoClose={3000} />

      <h2 className="text-2xl font-bold mb-4 text-gray-800">Order Management</h2>

      {/* Search Bar */}
      <div className="flex items-center mb-4 space-x-2">
        <Search size={20} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search by customer name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      {/* Order Table */}
      {loading ? (
        <p className="text-center text-gray-500">Loading orders...</p>
      ) : filteredOrders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Order ID</th>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-left">Total Price</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id} className="border-t">
                  <td className="p-3">{order._id}</td>
                  <td className="p-3">{order.customerName}</td>
                  <td className="p-3">Ksh {order.orderTotal.toFixed(2)}</td>
                  <td className="p-3">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                      className="p-2 border rounded-md bg-white"
                      disabled={order.status === "Cancelled"}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-3 flex space-x-2">
                    <button
                      className="px-3 py-1 bg-yellow-500 text-white rounded-md flex items-center space-x-1"
                      onClick={() => openEditModal(order._id)}
                    >
                      <Edit size={16} />
                      <span>Edit</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Order Modal */}
      {showEditModal && editingOrder && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h3 className="text-xl font-bold mb-4">Edit Order</h3>

            {/* Customer Name */}
            <input
              type="text"
              placeholder="Customer Name"
              value={editingOrder.customerName || ""}
              onChange={(e) => setEditingOrder({ ...editingOrder, customerName: e.target.value })}
              className="p-2 border w-full mb-2"
            />

            {/* Customer Email */}
            <input
              type="text"
              placeholder="Customer Email"
              value={editingOrder.customerEmail || ""}
              onChange={(e) => setEditingOrder({ ...editingOrder, customerEmail: e.target.value })}
              className="p-2 border w-full mb-2"
            />

            {/* Shipping Address - Street */}
            <input
              type="text"
              placeholder="Street"
              value={editingOrder.shippingAddress?.street || ""}
              onChange={(e) =>
                setEditingOrder({
                  ...editingOrder,
                  shippingAddress: { ...editingOrder.shippingAddress, street: e.target.value },
                })
              }
              className="p-2 border w-full mb-2"
            />

            {/* Shipping Address - City */}
            <input
              type="text"
              placeholder="City"
              value={editingOrder.shippingAddress?.city || ""}
              onChange={(e) =>
                setEditingOrder({
                  ...editingOrder,
                  shippingAddress: { ...editingOrder.shippingAddress, city: e.target.value },
                })
              }
              className="p-2 border w-full mb-2"
            />

            {/* Shipping Address - Postal Code */}
            <input
              type="text"
              placeholder="Postal Code"
              value={editingOrder.shippingAddress?.postalCode || ""}
              onChange={(e) =>
                setEditingOrder({
                  ...editingOrder,
                  shippingAddress: { ...editingOrder.shippingAddress, postalCode: e.target.value },
                })
              }
              className="p-2 border w-full mb-2"
            />

            {/* Shipping Address - Country */}
            <input
              type="text"
              placeholder="Country"
              value={editingOrder.shippingAddress?.country || ""}
              onChange={(e) =>
                setEditingOrder({
                  ...editingOrder,
                  shippingAddress: { ...editingOrder.shippingAddress, country: e.target.value },
                })
              }
              className="p-2 border w-full mb-2"
            />

            {/* Order Total */}
            <input
              type="number"
              placeholder="Order Total"
              value={editingOrder.orderTotal || ""}
              onChange={(e) => setEditingOrder({ ...editingOrder, orderTotal: e.target.value })}
              className="p-2 border w-full mb-2"
            />

            {/* Order Status Dropdown */}
            <select
              value={editingOrder.status}
              onChange={(e) => setEditingOrder({ ...editingOrder, status: e.target.value })}
              className="p-2 border w-full mb-2 bg-white"
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            {/* Action Buttons */}
            <button onClick={updateOrder} className="p-2 bg-blue-500 text-white w-full mt-2">
              Save Changes
            </button>
            <button onClick={closeEditModal} className="p-2 bg-gray-500 text-white w-full mt-2">
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default OrderManagement;
