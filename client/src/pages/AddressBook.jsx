import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus, faSave, faTimes } from "@fortawesome/free-solid-svg-icons";

const AddressManagement = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });
  const [editingAddressId, setEditingAddressId] = useState(null);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/addresses");

      // Check if response.data is an array before setting state
      if (Array.isArray(response.data)) {
        setAddresses(response.data);
      } else {
        // If API returns something other than an array, handle the error
        setError("API returned invalid data: Expected an array of addresses.");
        toast.error("Failed to fetch addresses: Invalid data format.");
        setAddresses([]); // Ensure addresses is an empty array to prevent .map error
      }
    } catch (err) {
      setError(err.message || "Failed to fetch addresses");
      toast.error("Failed to fetch addresses");
      setAddresses([]); // Ensure addresses is an empty array to prevent .map error
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAddress = async () => {
    try {
      await axios.post("/api/addresses", newAddress);
      toast.success("Address added successfully!");
      setNewAddress({ street: "", city: "", state: "", zipCode: "", country: "" }); // Reset the form
      setShowAddForm(false);
      fetchAddresses(); // Refresh the address list
    } catch (err) {
      setError(err.message || "Failed to add address");
      toast.error("Failed to add address");
    }
  };

  const handleEditAddress = (id) => {
    setEditingAddressId(id);
    // Find the address to edit and pre-populate the newAddress state.
    const addressToEdit = addresses.find((address) => address._id === id);
    if (addressToEdit) {
      setNewAddress({
        street: addressToEdit.street,
        city: addressToEdit.city,
        state: addressToEdit.state,
        zipCode: addressToEdit.zipCode,
        country: addressToEdit.country,
      });
    }
  };

  const handleUpdateAddress = async (id) => {
    try {
      await axios.put(`/api/addresses/${id}`, newAddress);
      toast.success("Address updated successfully!");
      setEditingAddressId(null); // Clear the editing state
      setNewAddress({ street: "", city: "", state: "", zipCode: "", country: "" }); // Reset the form
      fetchAddresses(); // Refresh the address list
    } catch (err) {
      setError(err.message || "Failed to update address");
      toast.error("Failed to update address");
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      await axios.delete(`/api/addresses/${id}`);
      toast.success("Address deleted successfully!");
      fetchAddresses(); // Refresh the address list
    } catch (err) {
      setError(err.message || "Failed to delete address");
      toast.error("Failed to delete address");
    }
  };

  const renderAddressList = () => {
    if (loading) {
      return <div className="text-center">Loading addresses...</div>;
    }

    if (error) {
      return <div className="text-red-500 text-center">Error: {error}</div>;
    }

    if (!Array.isArray(addresses) || addresses.length === 0) {
      return <div className="text-center">No addresses found.</div>;
    }

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                Street
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                City
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                State
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                Zip Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                Country
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {addresses.map((address) => (
              <tr
                key={address._id}
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                  {address.street}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {address.city}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {address.state}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {address.zipCode}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {address.country}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {editingAddressId === address._id ? (
                    <>
                      <button
                        onClick={() => handleUpdateAddress(address._id)}
                        className="text-green-600 hover:text-green-800 mr-2"
                      >
                        <FontAwesomeIcon icon={faSave} />
                      </button>
                      <button
                        onClick={() => setEditingAddressId(null)}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditAddress(address._id)}
                        className="text-indigo-600 hover:text-indigo-800 mr-2"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        onClick={() => handleDeleteAddress(address._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderAddForm = () => (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mt-4">
      <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">Add New Address</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="street" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Street
          </label>
          <input
            type="text"
            id="street"
            name="street"
            value={newAddress.street}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={newAddress.city}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            State
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={newAddress.state}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Zip Code
          </label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={newAddress.zipCode}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Country
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={newAddress.country}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleAddAddress}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Address
        </button>
        <button
          onClick={() => setShowAddForm(false)}
          className="ml-4 text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-6 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Address Management</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Add New Address
        </button>
      </div>

      {/* Address List */}
      {renderAddressList()}

      {/* Add Address Form */}
      {showAddForm && renderAddForm()}
    </div>
  );
};

export default AddressManagement;
