import React, { useEffect, useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";  // ✅ Import eye icons

// Reusable Modal Component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-lg">
        {children}
        <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded mt-4">
          Close
        </button>
      </div>
    </div>
  );
};

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    role: "customer",
  });

  const [showPassword, setShowPassword] = useState(false);  // ✅ Toggle for password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);  // ✅ Toggle for confirmPassword
  const [editingUser, setEditingUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/auth/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();

    if (newUser.password !== newUser.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        username: newUser.username,
        password: newUser.password,
        confirmPassword: newUser.confirmPassword,
        role: newUser.role,
      });

      setNewUser({ username: "", password: "", confirmPassword: "", role: "customer" });
      fetchUsers();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (!editingUser) return;

    try {
      await axios.put(`http://localhost:5000/api/auth/${editingUser._id}`, editingUser);
      setEditingUser(null);
      setIsModalOpen(false);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">User Management</h1>

      {/* Add User Form */}
      <form onSubmit={handleAddUser} className="mb-4 p-4 border rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Add New User</h2>
        <input
          type="text"
          placeholder="Username (email or phone)"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          required
          className="border p-2 rounded w-full mb-2"
        />

        {/* Password Input with Toggle */}
        <div className="relative mb-2">
          <input
            type={showPassword ? "text" : "password"}  // ✅ Toggle between password & text
            placeholder="Password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            required
            className="border p-2 rounded w-full pr-10"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}  {/* ✅ Toggle icon */}
          </button>
        </div>

        {/* Confirm Password Input with Toggle */}
        <div className="relative mb-2">
          <input
            type={showConfirmPassword ? "text" : "password"}  // ✅ Toggle between password & text
            placeholder="Confirm Password"
            value={newUser.confirmPassword}
            onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })}
            required
            className="border p-2 rounded w-full pr-10"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}  {/* ✅ Toggle icon */}
          </button>
        </div>

        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          className="border p-2 rounded w-full mb-2"
        >
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add User
        </button>
      </form>

      {/* User List Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Username</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Created At</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id} className="text-center">
                <td className="border p-2">{user._id}</td>
                <td className="border p-2 cursor-pointer text-blue-500 hover:underline" onClick={() => handleEditClick(user)}>
                  {user.username}
                </td>
                <td className="border p-2">{user.role}</td>
                <td className="border p-2">{new Date(user.createdAt).toLocaleString()}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded mx-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="p-4 text-center text-gray-500">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Edit User Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {editingUser && (
          <form onSubmit={handleUpdateUser} className="p-4">
            <h2 className="text-lg font-semibold mb-2">Edit User</h2>
            <input
              type="text"
              placeholder="Username"
              value={editingUser.username}
              onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
              required
              className="border p-2 rounded w-full mb-2"
            />
            <select
              value={editingUser.role}
              onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
              className="border p-2 rounded w-full mb-2"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
              Update User
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default UserManagement;
