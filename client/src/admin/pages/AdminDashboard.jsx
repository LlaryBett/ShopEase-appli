import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet, useLocation } from "react-router-dom";

const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Check if the current route is the admin dashboard root
  const isDashboardRoot = location.pathname === "/admin"; // Adjust path as needed

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className={`flex-1 min-h-screen transition-all duration-300 ${isOpen ? "lg:ml-64" : "lg:ml-64"}`}>
        <Navbar toggleSidebar={toggleSidebar} />

        {/* Page Content */}
        <div className="p-4 mt-16">
          {isDashboardRoot && (
            // Enhanced Welcome Message
            <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-8 rounded-lg shadow-lg mb-4 animate__animated animate__fadeInDown">
              <h2 className="text-4xl font-bold mb-2">Welcome to the ShopEase Admin Dashboard!</h2>
              <p className="text-lg">We're excited to have you here. Explore the features and manage your tasks efficiently.</p>
            </div>
          )}

          {isDashboardRoot && (
            // Additional Static Content
            <div className="bg-white p-6 rounded-lg shadow-md mt-4">
              <h3 className="text-2xl font-semibold mb-2">Dashboard Overview</h3>
              <p className="text-gray-700">
                This dashboard allows you to manage users, view analytics, and access various administrative tools.
                Use the sidebar to navigate through different sections.
              </p>
            </div>
          )}

          {/* Render child pages */}
          {!isDashboardRoot && (
            <div className="text-gray-600 text-center mt-10">
              <p>Please select an option from the sidebar to view more details.</p>
            </div>
          )}

          <Outlet /> {/* Child pages (like UserManagement) will render here */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
