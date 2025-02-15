import React, { useState } from "react";
import { FaUserCircle, FaKey, FaEnvelope, FaUser } from "react-icons/fa";

const Settings = () => {
  const [profileImage, setProfileImage] = useState(localStorage.getItem("adminProfile") || null);
  const [name, setName] = useState(localStorage.getItem("adminName") || "");
  const [email, setEmail] = useState(localStorage.getItem("adminEmail") || "");
  const [password, setPassword] = useState("");

  // Handle Profile Image Upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        localStorage.setItem("adminProfile", reader.result); // Save to localStorage
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Form Submission
  const handleSaveChanges = (e) => {
    e.preventDefault();
    localStorage.setItem("adminName", name);
    localStorage.setItem("adminEmail", email);
    alert("Profile updated successfully!");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Admin Settings</h2>

      {/* Profile Image Upload */}
      <div className="flex flex-col items-center mb-6">
        <label htmlFor="profileUpload" className="cursor-pointer">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Admin Profile"
              className="w-24 h-24 rounded-full border-2 border-gray-300 object-cover"
            />
          ) : (
            <FaUserCircle className="w-24 h-24 text-gray-400" />
          )}
        </label>
        <input type="file" id="profileUpload" accept="image/*" className="hidden" onChange={handleImageUpload} />
        <p className="mt-2 text-sm">Change Profile Picture</p>
      </div>

      {/* Admin Details Form */}
      <form onSubmit={handleSaveChanges} className="space-y-4">
        <div className="flex items-center border rounded-lg p-2">
          <FaUser className="text-gray-500 mr-2" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Admin Name"
            className="w-full outline-none bg-transparent"
            required
          />
        </div>

        <div className="flex items-center border rounded-lg p-2">
          <FaEnvelope className="text-gray-500 mr-2" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Admin Email"
            className="w-full outline-none bg-transparent"
            required
          />
        </div>

        <div className="flex items-center border rounded-lg p-2">
          <FaKey className="text-gray-500 mr-2" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password (optional)"
            className="w-full outline-none bg-transparent"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Settings;
