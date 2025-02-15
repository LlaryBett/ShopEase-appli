import React from "react";
import { FaBars } from "react-icons/fa";
import PropTypes from "prop-types";

const Navbar = ({ toggleSidebar }) => {
  return (
    <div className="bg-gray-800 text-white p-4 fixed top-0 right-0 flex items-center justify-between z-40 
      w-full lg:w-[calc(100%-16rem)] lg:ml-64 transition-all duration-300">
      {/* Hamburger Button for Small Screens */}
      <button className="lg:hidden text-white" onClick={toggleSidebar}>
        <FaBars size={24} />
      </button>

      <h2 className="text-lg font-semibold mx-auto lg:ml-4">Admin Dashboard</h2>
    </div>
  );
};

Navbar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

export default Navbar;
