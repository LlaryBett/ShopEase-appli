const express = require('express');
const router = express.Router();
const orderCtrl = require('../controllers/orderCtrl'); 

// Create a new order
router.post('/', orderCtrl.createOrder);

// Get all orders
router.get('/', orderCtrl.getAllOrders);

// Get a specific order by ID
router.get('/:id', orderCtrl.getOrderById);

// ✅ Update the entire order (shipping address, items, order total, and status)
router.put('/:id', orderCtrl.updateOrder);

// ✅ Update only the order status (if needed separately)
router.patch('/:id/status', orderCtrl.updateOrderStatus);

// Delete an order
router.delete('/:id', orderCtrl.deleteOrder);

module.exports = router;
