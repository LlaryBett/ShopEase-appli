import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// Create Context
const CartContext = createContext();

// Custom hook to use the Cart Context
export const useCart = () => {
  return useContext(CartContext);
};

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(""); // State for feedback messages
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  // Fetch cart data from backend
  const fetchCartFromBackend = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/cart/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(response.data.products || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch cart on page load or whenever userId or token changes
  useEffect(() => {
    if (userId && token) {
      fetchCartFromBackend();
    } else {
      setLoading(false);
    }
  }, [userId, token]);

  // Calculate cart count dynamically based on cartItems
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Calculate total price of items in the cart
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.productId.isPrice.replace(/[^\d.]/g, '')); // Parse price correctly
      return total + (price * item.quantity);
    }, 0).toFixed(2); // Return total as a string with two decimal places
  };
// add item to cart
const addItemToCart = async (item) => {
  if (!token || !userId) {
    console.error("User not authenticated");
    return;
  }

  const productId = item._id;
  const price = parseFloat(item.isPrice.replace(/[^\d.]/g, ""));

  if (!productId || isNaN(price)) {
    console.error("Missing productId or invalid price!", { productId, price, item });
    return;
  }

  try {
    // Fetch latest cart items to ensure we have the correct cart state
    await fetchCartFromBackend();

    // Check if the item is already in the cart
    const existingItem = cartItems.find((cartItem) => cartItem.productId === productId);

    if (existingItem) {
      setMessage("Item is already in the cart.");
      await updateItemQuantity(productId, existingItem.quantity + 1);
      return;
    }

    // Add item to cart if it doesn't exist
    const payload = {
      userId,
      productId,
      name: item.name,
      image: item.image,
      price,
      quantity: 1,
    };

    await axios.post("http://localhost:5000/api/cart/add", payload, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    });

    fetchCartFromBackend();
    setMessage("Item added to cart successfully!");
  } catch (error) {
    console.error("Error adding/updating item in cart:", error.response?.data || error.message);

    // Handle specific error message
    if (error.response?.data?.message === "Product is already in the cart") {
      setMessage("Item is already in the cart.");
    } else {
      setMessage("Failed to add item to cart.");
    }
  }
};


  // Update item quantity in the cart
  const updateItemQuantity = async (productId, quantity) => {
    if (!token || !userId) return;

    try {
      await axios.put('http://localhost:5000/api/cart/update', { userId, productId, quantity }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCartFromBackend(); // Refresh cart after updating quantity
    } catch (error) {
      console.error("Error updating item quantity:", error);
    }
  };

  // Remove item from the cart
  const removeFromCart = async (productId) => {
    if (!token || !userId) return;

    try {
      await axios.delete('http://localhost:5000/api/cart/remove', {
        data: { userId, productId },
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCartFromBackend(); // Refresh cart after removing item
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // Clear the entire cart
  const clearCart = async () => {
    if (!token || !userId) return;

    try {
      await axios.delete('http://localhost:5000/api/cart/clear', {
        data: { userId },
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems([]); // Reset cart items state
      setMessage("Cart cleared successfully!"); // Set message for clearing cart
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  // Re-fetch the cart when the user navigates back to the homepage
  useEffect(() => {
    const handleRouteChange = () => {
      fetchCartFromBackend();
    };

    window.addEventListener('popstate', handleRouteChange); // Detect back/forward navigation

    return () => window.removeEventListener('popstate', handleRouteChange); // Cleanup on component unmount
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <CartContext.Provider value={{
      cartItems,
      cartCount,
      addItemToCart,
      removeFromCart,
      updateItemQuantity,
      clearCart,
      fetchCartFromBackend,
      calculateTotal,
      message, // Include message in context value for access in components
      setMessage, // Provide setter for message to clear it when needed
    }}>
      {children}
      
      {/* It's better to display messages in components that need them instead of here */}
      
    </CartContext.Provider>
  );
};

// PropTypes validation for CartProvider component
CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartContext;
