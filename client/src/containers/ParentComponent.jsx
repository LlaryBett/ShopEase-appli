import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import TopSellers from "../components/TopSellers"; // Import TopSellers

const ParentComponent = () => {
  const [cartCount, setCartCount] = useState(0); // State for cart count

  // Function to update cart count (fetch from server)
  const updateCartCount = async () => {
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      if (!token) {
        console.error("No token found!");
        return;
      }

      // Decode user ID safely from JWT token
      const user = decodeToken(token);
      if (!user) {
        console.error("Invalid token format or missing userId");
        return;
      }

      const userId = user.userId;
      const response = await fetch(`http://localhost:5000/api/cart/count/${userId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch cart count');
      }

      const data = await response.json(); // Parse response as JSON
      setCartCount(data.count); // Update cart count state with response data
    } catch (error) {
      console.error("Failed to fetch cart count:", error); // Log any errors that occur
    }
  };

  // Safe decode function for token
  const decodeToken = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      console.error("Invalid token format");
      return null;
    }
  };

  // Fetch the cart count on component mount
  useEffect(() => {
    updateCartCount(); // Call the updateCartCount function when the component mounts
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  // Log the updateCartCount function to confirm it's being passed
  console.log(updateCartCount);

  return (
    <div>
      <Header cartCount={cartCount} /> {/* Pass cart count to Header */}
      <TopSellers 
        updateCartCount={updateCartCount}  // Pass the updateCartCount function to TopSellers
        cartCount={cartCount}  // Pass cartCount to TopSellers
      />
    </div>
  );
};

export default ParentComponent;
