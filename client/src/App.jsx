import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import Account from "./pages/Account";
import Cart from "./pages/Cart";
import Messages from "./pages/Messages";
import ProductDetails from "./pages/ProductDetails";
import AddressBook from "./pages/AddressBook"; // ✅ Import AddressBook

import { CartProvider } from "./components/Context/MyCartContext"; // Import CartProvider
import axios from "axios";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .post("http://localhost:5000/api/auth/verify-token", { token })
        .then((response) => {
          setIsAuthenticated(response.data.valid);
          if (!response.data.valid) {
            localStorage.removeItem("token");
          }
        })
        .catch(() => {
          setIsAuthenticated(false);
          localStorage.removeItem("token");
        })
        .finally(() => setLoading(false));
    } else {
      setIsAuthenticated(false);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <CartProvider> {/* Wrap all routes with CartProvider */}
      <Router>
        <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          <Route 
            path="/" 
            element={<HomePage isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} 
          />
          <Route 
            path="/account" 
            element={<Account setIsAuthenticated={setIsAuthenticated} />} 
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/messages" element={<Messages />} />
          <Route 
            path="/product/:id" 
            element={<ProductDetails isAuthenticated={isAuthenticated} />} 
          />
          <Route path="/address-book" element={<AddressBook />} />  {/* ✅ New Address Book Route */}
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
