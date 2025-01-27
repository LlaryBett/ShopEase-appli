import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header"; // Correct import
import HomePage from "./pages/HomePage";  // Correct import
import Account from "./pages/Account";    // Import Account page

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Render the HomePage for the "/" route */}
        <Route path="/" element={<HomePage />} />
        {/* Render the Account page for the "/account" route */}
        <Route path="/account" element={<Account />} />
        {/* Add other routes like /product/:id, /cart */}
      </Routes>
    </Router>
  );
};

export default App;
