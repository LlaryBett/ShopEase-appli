const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/productController');
const { searchProducts } = require("../controllers/productController"); // Import the controller

// Route to handle product search (ensure it's before any dynamic ID routes)
router.get('/search', searchProducts);  // This uses the searchProducts controller method

router.get('/', productCtrl.getAllProducts);  // Get all products
router.get('/:id', productCtrl.getProductById);  // Get product by ID
router.get('/section/:section', productCtrl.getProductsBySection);  // Get products by section
router.post('/', productCtrl.createProduct);  // Create a new product
router.put('/:id', productCtrl.updateProduct);  // Update a product
router.delete('/:id', productCtrl.deleteProduct);  // Delete a product

module.exports = router;
