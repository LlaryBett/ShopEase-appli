import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUsers, FaBox, FaShoppingCart, FaChartBar, FaMapMarkerAlt,
  FaTags, FaUserCircle, FaCog, FaTimes
} from "react-icons/fa";
import PropTypes from "prop-types";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [profileImage, setProfileImage] = useState(localStorage.getItem("adminProfile") || null);

  // Handle Profile Image Upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        localStorage.setItem("adminProfile", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Close sidebar after clicking a link on small screens
  const handleNavClick = () => {
    if (window.innerWidth < 1024) {
      toggleSidebar();
    }
  };

  return (
    <>
      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white p-4 w-64 transition-transform duration-300 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:w-64 z-50`}
      >
        {/* Close Button for Small Screens */}
        <button className="lg:hidden absolute top-4 right-4 text-white" onClick={toggleSidebar}>
          <FaTimes size={24} />
        </button>

        {/* Admin Profile Section */}
        <div className="flex flex-col items-center mb-6">
          <label htmlFor="profileUpload" className="cursor-pointer">
            {profileImage ? (
              <img src={profileImage} alt="Admin Profile" className="w-16 h-16 rounded-full border-2 border-white object-cover" />
            ) : (
              <FaUserCircle className="w-16 h-16 text-gray-400" />
            )}
          </label>
          <input type="file" id="profileUpload" accept="image/*" className="hidden" onChange={handleImageUpload} />
          <p className="mt-2 text-sm">Upload Profile</p>
        </div>

        <h2 className="text-xl font-bold mb-4 text-center">Admin Panel</h2>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-4">
          <Link to="/admin/users" className="flex items-center gap-2 hover:text-blue-400" onClick={handleNavClick}>
            <FaUsers /> User Management
          </Link>
          <Link to="/admin/products" className="flex items-center gap-2 hover:text-blue-400" onClick={handleNavClick}>
            <FaBox /> Product Management
          </Link>
          <Link to="/admin/orders" className="flex items-center gap-2 hover:text-blue-400" onClick={handleNavClick}>
            <FaShoppingCart /> Order Management
          </Link>
          <Link to="/admin/analytics" className="flex items-center gap-2 hover:text-blue-400" onClick={handleNavClick}>
            <FaChartBar /> Analytics & Reports
          </Link>
          <Link to="/admin/addresses" className="flex items-center gap-2 hover:text-blue-400" onClick={handleNavClick}>
            <FaMapMarkerAlt /> Address Management
          </Link>
          <Link to="/admin/categories" className="flex items-center gap-2 hover:text-blue-400" onClick={handleNavClick}>
            <FaTags /> Category & Brand Management
          </Link>

          {/* Settings Button */}
          <Link to="/admin/settings" className="flex items-center gap-2 hover:text-blue-400 mt-4 border-t border-gray-700 pt-4" onClick={handleNavClick}>
            <FaCog /> Settings
          </Link>
        </nav>
      </div>

      {/* Overlay to close sidebar on small screens */}
      {isOpen && <div className="fixed inset-0 bg-black opacity-50 lg:hidden" onClick={toggleSidebar}></div>}
    </>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
