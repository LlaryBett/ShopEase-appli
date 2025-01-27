import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

const Account = () => {
  return (
    <div className="p-6">
      {/* ShopEase name to navigate to the homepage */}
      <div className="hidden sm:block">
        <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-800">
          ShopEase
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-4">My Account</h1>
      <p className="text-gray-700">Manage your account details here.</p>
    </div>
  );
};

export default Account;
