import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

// Create CartContext
const CartContext = createContext();

// Provide the CartContext
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, calculateTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Validate props using PropTypes
CartProvider.propTypes = {
  children: PropTypes.node.isRequired, // Ensure children is provided and is a React node
};

// Hook to use the CartContext
export const useCart = () => useContext(CartContext);
