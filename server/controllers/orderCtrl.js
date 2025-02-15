const Order = require("../models/Order");

// Create a new order
const createOrder = async (req, res) => {
    try {
        const { customerName, customerEmail, items, shippingAddress, paymentMethod, orderTotal } = req.body;

        const newOrder = new Order({
            customerName,
            customerEmail,
            items,
            shippingAddress,
            paymentMethod,
            orderTotal,
            status: "Pending",
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Failed to create order" });
    }
};

// Get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Failed to fetch orders" });
    }
};

// Get order by ID
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: "Order not found" });
        res.status(200).json(order);
    } catch (error) {
        console.error("Error fetching order:", error);
        res.status(500).json({ message: "Failed to fetch order" });
    }
};

// Update order status
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!updatedOrder) return res.status(404).json({ message: "Order not found" });
        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({ message: "Failed to update order" });
    }
};

// ✅ Update Full Order (Shipping Address, Items, Order Total, etc.)
const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { customerName, customerEmail, items, shippingAddress, paymentMethod, orderTotal, status } = req.body;

    try {
        let order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // ✅ Update order fields
        order.customerName = customerName || order.customerName;
        order.customerEmail = customerEmail || order.customerEmail;
        order.items = items || order.items;
        order.shippingAddress = shippingAddress || order.shippingAddress;
        order.paymentMethod = paymentMethod || order.paymentMethod;
        order.orderTotal = orderTotal || order.orderTotal;
        order.status = status || order.status; // Allow status update

        await order.save();
        res.status(200).json({ message: "Order updated successfully", order });

    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({ message: "Failed to update order", error });
    }
};

// Delete an order
const deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) return res.status(404).json({ message: "Order not found" });
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).json({ message: "Failed to delete order" });
    }
};

// ✅ Fix: Ensure all functions are properly exported
module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    updateOrderStatus,
    deleteOrder,
};
