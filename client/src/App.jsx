// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header"; // Correct import
import HomePage from "./pages/HomePage";  // Correct import


const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Render the HomePage for the "/" route */}
        <Route path="/" element={<HomePage />} />
        {/* Add other routes like /product/:id, /cart */}
      </Routes>
      
    </Router>
  );
};

export default App;
