import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header"; // Correct import for Header component
import HomePage from "./pages/HomePage"; // Correct import for HomePage
import Account from "./pages/Account"; // Correct import for Account page
import Cart from "./pages/Cart"; // Correct import for Cart page
// import { CartProvider } from "./components/Context/CartContext"; // Ensure casing matches the actual file name

const App = () => {
  return (
    // Wrap the app in the CartProvider to make the cart context available
    <CartProvider>
      <Router>
        {/* Render the Header component */}
        <Header />
        <Routes>
          {/* Render the HomePage for the "/" route */}
          <Route path="/" element={<HomePage />} />
          {/* Render the Account page for the "/account" route */}
          <Route path="/account" element={<Account />} />
          {/* Render the Cart page for the "/cart" route */}
          <Route path="/cart" element={<Cart />} />
          {/* Add more routes here as needed */}
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
