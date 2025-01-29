import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header"; // Ensure the path is correct
import HomePage from "./pages/HomePage"; // Ensure the path is correct
import Account from "./pages/Account"; // Ensure the path is correct
import Cart from "./pages/Cart"; // Ensure the path is correct
import { CartProvider } from "./components/Context/CartContext"; // ✅ FIXED IMPORT

const App = () => {
  return (
    <CartProvider> {/* ✅ Correctly wraps everything */}
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/account" element={<Account />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
