import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaBox, FaShoppingCart, FaChartBar, FaMapMarkerAlt, FaTags, FaCog, FaTimes, FaUserCircle } from "react-icons/fa";
import axios from "axios";
import PropTypes from "prop-types";

const API_BASE_URL = "http://localhost:5000"; // Ensure this matches your actual API URL

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState("");

  // Fetch Admin Profile
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("⛔ No token found");
          return;
        }

        const res = await axios.get(`${API_BASE_URL}/api/auth/admin/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setName(res.data.name || "Admin");
        setProfileImage(res.data.profileImage || null);
      } catch (error) {
        console.error("❌ Error fetching admin data:", error.response?.data || error.message);
      }
    };

    fetchAdminData();
  }, []);

  return (
    <>
      <div 
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white p-4 w-64 transition-transform duration-300 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:w-64 z-50`}
      >
        <button className="lg:hidden absolute top-4 right-4 text-white" onClick={toggleSidebar}>
          <FaTimes size={24} />
        </button>

        {/* Profile Section */}
        <div className="flex flex-col items-center mb-6">
          {profileImage ? (
            <img 
              src={profileImage} 
              alt="Admin Profile" 
              className="w-20 h-20 rounded-full border-2 border-gray-400 object-cover"
            />
          ) : (
            <FaUserCircle className="w-20 h-20 text-gray-500" />
          )}
          <h2 className="text-lg font-bold mt-2">{name}</h2>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-4">
          <Link to="/admin/users" className="flex items-center gap-2 hover:text-blue-400" onClick={toggleSidebar}>
            <FaUsers /> User Management
          </Link>
          <Link to="/admin/products" className="flex items-center gap-2 hover:text-blue-400" onClick={toggleSidebar}>
            <FaBox /> Product Management
          </Link>
          <Link to="/admin/orders" className="flex items-center gap-2 hover:text-blue-400" onClick={toggleSidebar}>
            <FaShoppingCart /> Order Management
          </Link>
          <Link to="/admin/analytics" className="flex items-center gap-2 hover:text-blue-400" onClick={toggleSidebar}>
            <FaChartBar /> Analytics & Reports
          </Link>
          <Link to="/admin/addresses" className="flex items-center gap-2 hover:text-blue-400" onClick={toggleSidebar}>
            <FaMapMarkerAlt /> Address Management
          </Link>
          <Link to="/admin/categories" className="flex items-center gap-2 hover:text-blue-400" onClick={toggleSidebar}>
            <FaTags /> Category & Brand Management
          </Link>
          <Link to="/admin/settings" className="flex items-center gap-2 hover:text-blue-400 mt-4 border-t border-gray-700 pt-4" onClick={toggleSidebar}>
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
