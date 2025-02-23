import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import Account from "./pages/Account";
import Cart from "./pages/Cart";
import Messages from "./pages/Messages";
import ProductDetails from "./pages/ProductDetails";
import AddressBook from "./pages/AddressBook";
import { CartProvider } from "./components/Context/MyCartContext";
import axios from "axios";

// Import Admin Components
import AdminDashboard from "./admin/pages/AdminDashboard";
import UserManagement from "./admin/pages/UserManagement";
import ProductManagement from "./admin/pages/ProductManagement";
import OrderManagement from "./admin/pages/OrderManagement";
import Analytics from "./admin/pages/Analytics";
import AddressManagement from "./admin/pages/AddressManagement";
import CategoryManagement from "./admin/pages/CategoryManagement";
import Settings from "./admin/pages/Settings";

// ✅ Use Environment Variable for API URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("🔄 useEffect triggered - Checking token on page reload");

    const token = localStorage.getItem("token");
    console.log("🔍 Token from localStorage:", token);

    if (!token) {
      console.log("❌ No token found. User is not authenticated.");
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    axios
      .get(`${API_BASE_URL}/api/auth/verify-token`, {
        headers: { Authorization: `Bearer ${token}` }, // ✅ Send token in headers
      })
      .then((response) => {
        console.log("✅ Token verification successful:", response.data);
        setIsAuthenticated(true);
      })
      .catch((error) => {
        console.error("❌ Token verification failed:", error.response?.data || error);
        setIsAuthenticated(false);
        localStorage.removeItem("token"); // ✅ Remove invalid token
      })
      .finally(() => {
        console.log("⏳ Loading state set to false");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <CartProvider>
      <Router>
        <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          {/* ✅ Customer Routes */}
          <Route path="/" element={<HomePage isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/account" element={<Account setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/product/:id" element={<ProductDetails isAuthenticated={isAuthenticated} />} />
          <Route path="/address-book" element={<AddressBook />} />

          {/* ✅ Admin Routes */}
          <Route path="/admin/*" element={<AdminDashboard />}>
            <Route path="users" element={<UserManagement />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="orders" element={<OrderManagement />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="addresses" element={<AddressManagement />} />
            <Route path="categories" element={<CategoryManagement />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
