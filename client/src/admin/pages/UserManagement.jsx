import React, { useEffect, useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>
        {children}
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
  const [showPassword, setShowPassword] = useState(false);
  const [allAddresses, setAllAddresses] = useState([]); // Store all available addresses
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);
  useEffect(() => {
    fetchUsers();
    fetchAddresses(); // Fetch addresses on load
  }, []);
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://shopease-appli.onrender.com/api/auth"
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users.");
    }
  };
  const fetchAddresses = async () => {
    try {
      const response = await axios.get("https://shopease-appli.onrender.com/api/addresses");
      setAllAddresses(response.data); // Store addresses in state
    } catch (error) {
      console.error("Error fetching addresses:", error);
      toast.error("Failed to fetch addresses.");
    }
  };
  const handleDelete = async (id) => {
    toast.warn(
      <div>
        <p>Are you sure you want to delete this user?</p>
        <div className="mt-2 flex gap-4">
          <button
            onClick={async () => {
              try {
                await axios.delete(`https://shopease-appli.onrender.com/api/auth/${id}`);
                setUsers(users.filter((user) => user._id !== id));
                toast.dismiss();
                toast.success("User deleted successfully!");
              } catch (error) {
                console.error("Error deleting user:", error);
                toast.dismiss();
                toast.error("Failed to delete user.");
              }
            }}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>,
      { autoClose: false }
    );
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (newUser.password !== newUser.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      await axios.post(
        "https://shopease-appli.onrender.com/api/auth/register",
        newUser
      );
      setNewUser({ username: "", password: "", confirmPassword: "", role: "customer" });
      setIsAddModalOpen(false);
      fetchUsers();
      toast.success("User added successfully!");
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("Failed to add user.");
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (!editingUser) return;

    try {
      await axios.put(
        `https://shopease-appli.onrender.com/api/auth/${editingUser._id}`,
        editingUser
      );
      setEditingUser(null);
      setIsModalOpen(false);
      fetchUsers();
      toast.success("User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user.");
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">User Management</h1>

      {/* Add User Button */}
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4"
      >
        Add New User
      </button>

     {/* User List */}
<div className="mb-8">
  <h2 className="text-xl font-semibold mb-4">Existing Users</h2>
  <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
    <thead>
      <tr className="bg-gray-200 text-left">
        <th className="px-4 py-2">Username</th>
        <th className="px-4 py-2">Role</th>
        <th className="px-4 py-2">Created At</th>
        <th className="px-4 py-2">Addresses</th>
        <th className="px-4 py-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user) => (
        <tr key={user._id} className="border-b">
          <td className="px-4 py-2">{user.username}</td>
          <td className="px-4 py-2 capitalize">{user.role}</td>
          <td className="px-4 py-2">
            {new Date(user.createdAt).toLocaleDateString()}
          </td>
          <td className="px-4 py-2 relative">
            {user.addresses && user.addresses.length > 0 ? (
              <details className="group">
                <summary className="cursor-pointer bg-gray-200 px-3 py-1 rounded text-gray-700">
                  View Addresses
                </summary>
                <ul className="absolute bg-white border shadow-md p-2 mt-1 rounded w-48 z-10">
                  {user.addresses.map((address, index) => (
                    <li key={index} className="p-1 border-b last:border-none">
                      {address}
                    </li>
                  ))}
                </ul>
              </details>
            ) : (
              <span className="text-gray-500">No Address</span>
            )}
          </td>
          <td className="px-4 py-2 space-x-2">
            <button
              onClick={() => handleEditClick(user)}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(user._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      {/* Add User Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <h2 className="text-xl font-semibold mb-4">Add New User</h2>
        <form onSubmit={handleAddUser}>
          <input
            type="text"
            placeholder="Username"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            required
            className="w-full mb-2 p-2 border rounded"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              required
              className="w-full mb-2 p-2 border rounded"
            />
            <span
              className="absolute right-2 top-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </span>
          </div>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={newUser.confirmPassword}
              onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })}
              required
              className="w-full mb-2 p-2 border rounded"
            />
            <span
              className="absolute right-2 top-3 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </span>
          </div>
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            Add User
          </button>
        </form>
      </Modal>


     {/* Edit User Modal */}
{editingUser && (
  <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
    <h2 className="text-xl font-semibold mb-4">Edit User</h2>
    <form onSubmit={handleUpdateUser}>
      {/* Username Input */}
      <input
        type="text"
        value={editingUser.username}
        onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
        className="w-full mb-2 p-2 border rounded"
        placeholder="Username"
      />

      {/* Role Selection */}
      <select
        value={editingUser.role}
        onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
        className="w-full mb-2 p-2 border rounded"
      >
        <option value="customer">Customer</option>
        <option value="admin">Admin</option>
      </select>

      {/* Address Selection */}
      <label className="block mb-2 font-semibold">Addresses</label>
      <select
        multiple
        value={editingUser.addresses || []}
        onChange={(e) => {
          const selectedAddresses = Array.from(e.target.selectedOptions, (option) => option.value);
          setEditingUser({ ...editingUser, addresses: selectedAddresses });
        }}
        className="w-full mb-2 p-2 border rounded"
      >
        {allAddresses.map((address) => (
          <option key={address._id} value={address._id}>
            {`${address.street}, ${address.city}, ${address.county}`}
          </option>
        ))}
      </select>

      {/* Update Button */}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Update User
      </button>
    </form>
  </Modal>
)}


      <ToastContainer />
    </div>
  );
};

export default UserManagement;
