const express = require("express");
const { addToCart, getCart, updateCartItem, removeFromCart, clearCart, getCartCount } = require("../controllers/cartCtrl"); // Make sure getCartCount is included here
const { verifyToken } = require("../middlewares/authMiddleware");


const router = express.Router();

router.post("/add", verifyToken, addToCart); // Add to cart
router.get("/:userId", verifyToken, getCart); // Get user's cart
router.put("/update", verifyToken, updateCartItem); // Update cart item quantity
router.delete("/remove", verifyToken, removeFromCart); // Remove item from cart
router.delete("/clear", verifyToken, clearCart); // Clear cart
router.get("/count/:userId", verifyToken, getCartCount); // Corrected route for cart count

module.exports = router;
