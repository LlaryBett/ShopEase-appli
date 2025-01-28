import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header"; // Correct import
import HomePage from "./pages/HomePage"; // Correct import
import Account from "./pages/Account"; // Import Account page
import Cart from "./pages/Cart"; // Import Cart page
import { CartProvider } from "./components/context/CartContext"; // Import CartContext

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          {/* Render the HomePage for the "/" route */}
          <Route path="/" element={<HomePage />} />
          {/* Render the Account page for the "/account" route */}
          <Route path="/account" element={<Account />} />
          {/* Render the Cart page for the "/cart" route */}
          <Route path="/cart" element={<Cart />} />
          {/* Add other routes like /product/:id, /checkout, etc. */}
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
