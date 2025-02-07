const Cart = require("../models/Cart");


// 📌 Add product to cart or update quantity
const addToCart = async (req, res) => {
    try {
        console.log("Incoming request body:", req.body); // Log request body
        
        const { userId, productId, name, image, price, quantity } = req.body;

        if (!userId || !productId || !name || !image || !price || !quantity) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, products: [] });
        }

        const productIndex = cart.products.findIndex((p) => p.productId.toString() === productId);

        if (productIndex > -1) {
            return res.status(400).json({ message: "Product is already in the cart" });
        } else {
            cart.products.push({ productId, name, image, price, quantity });
            await cart.save();
            return res.status(200).json({ message: "Product added to cart successfully!", cart });
        }
    } catch (error) {
        console.error("Error in addToCart:", error); // Log the full error message
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// 📌 Fetch user's cart
const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId }).populate("products.productId");

    if (!cart) {
      return res.status(200).json({ products: [] });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 📌 Update product quantity in cart
const updateCartItem = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = cart.products.findIndex((p) => p.productId.toString() === productId);

    if (productIndex > -1) {
      cart.products[productIndex].quantity = quantity;
    }

    await cart.save();
    res.status(200).json({ message: "Cart updated", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 📌 Remove product from cart
const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.products = cart.products.filter((p) => p.productId.toString() !== productId);
    await cart.save();

    res.status(200).json({ message: "Product removed", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 📌 Clear entire cart
const clearCart = async (req, res) => {
  try {
    const { userId } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.products = [];
    await cart.save();

    res.status(200).json({ message: "Cart cleared", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 📌 Get cart count
const getCartCount = async (req, res) => {
    try {
      const { userId } = req.params;
      const cart = await Cart.findOne({ userId });
  
      if (!cart) {
        return res.status(200).json({ count: 0 });
      }
  
      const count = cart.products.reduce((total, item) => total + item.quantity, 0); // Calculate the total quantity
      res.status(200).json({ count });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  
  module.exports = { addToCart, getCart, updateCartItem, removeFromCart, clearCart, getCartCount }; 