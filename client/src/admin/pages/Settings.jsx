import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserCircle, FaKey, FaEnvelope, FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Settings = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [profileFile, setProfileFile] = useState(null); // Store the file object
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch Admin Data
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }

        const res = await axios.get(`${API_BASE_URL}/api/auth/admin/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setName(res.data.name || "");
        setEmail(res.data.email || "");
        setUsername(res.data.username || "");
        setProfileImage(res.data.profileImage || null);
      } catch (error) {
        console.error("Error fetching admin data:", error.response?.data || error.message);
      }
    };

    fetchAdminData();
  }, []);

  // Handle Profile Image Upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileFile(file); // Save the file object for upload
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result); // Display preview
      reader.readAsDataURL(file);
    }
  };

  // Validate Inputs
  const validateInputs = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email format.";
    if (password && password !== confirmPassword) newErrors.password = "Passwords do not match.";
    return newErrors;
  };

  // Save Changes
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      if (password) formData.append("password", password);
      if (profileFile) formData.append("profileImage", profileFile);

      await axios.put(`${API_BASE_URL}/api/auth/admin/update-profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Profile updated successfully!"); // Success notification
      setPassword("");
      setConfirmPassword("");
      setErrors({});
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message);
      toast.error("Failed to update profile. Please try again."); // Error notification
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Admin Settings</h2>

      {/* Profile Image Section */}
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
        <input
          type="file"
          id="profileUpload"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
        <p className="mt-2 text-sm">Change Profile Picture</p>
        {username && <p className="mt-2 text-lg font-semibold">{username}</p>}
      </div>

      {/* Form Section */}
      <form onSubmit={handleSaveChanges} className="space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block mb-1 font-medium">
            Name
          </label>
          <div className="flex items-center border rounded-lg p-2">
            <FaUser className="text-gray-500 mr-2" />
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full outline-none bg-transparent"
            />
          </div>
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <div className="flex items-center border rounded-lg p-2">
            <FaEnvelope className="text-gray-500 mr-2" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full outline-none bg-transparent"
            />
          </div>
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* New Password Field */}
        <div>
          <label htmlFor="password" className="block mb-1 font-medium">
            New Password (optional)
          </label>
          <div className="flex items-center border rounded-lg p-2">
            <FaKey className="text-gray-500 mr-2" />
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter a new password"
              className="w-full outline-none bg-transparent"
            />
          </div>
        </div>

        {/* Confirm Password Field */}
        <div>
          <label htmlFor="confirmPassword" className="block mb-1 font-medium">
            Confirm New Password
          </label>
          <div className="flex items-center border rounded-lg p-2">
            <FaKey className="text-gray-500 mr-2" />
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter the new password"
              className="w-full outline-none bg-transparent"
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg font-bold ${
            loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover draggable />
    </div>
  );
};

export default Settings;
