import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className={`flex-1 min-h-screen transition-all duration-300 
        ${isOpen ? "lg:ml-64" : "lg:ml-64"}`}>
        <Navbar toggleSidebar={toggleSidebar} />
        
        {/* Page Content */}
        <div className="p-4 mt-16">
          <Outlet />  {/* ✅ Child pages (like UserManagement) will render here */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
