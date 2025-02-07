import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaCheckCircle } from "react-icons/fa";

const AddressBook = () => {
  const [addresses, setAddresses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);

  useEffect(() => {
    fetchAddresses();
  }, []);

  // Fetch addresses from the backend
  const fetchAddresses = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/addresses", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await response.json();

      // Ensure data is an array
      if (Array.isArray(data)) {
        setAddresses(data);
      } else {
        setAddresses([]); // Set to empty array if invalid data is returned
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
      setAddresses([]); // Ensure it's always an array
    }
  };

  // Open modal for adding/editing an address
  const handleOpenModal = (address = null) => {
    setCurrentAddress(address);
    setShowModal(true);
  };

  // Delete an address
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        await fetch(`http://localhost:5000/api/addresses/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        fetchAddresses();
      } catch (error) {
        console.error("Error deleting address:", error);
      }
    }
  };

  // Set an address as default
  const handleSetDefault = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/addresses/${id}/set-default`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchAddresses();
    } catch (error) {
      console.error("Error setting default address:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold text-center mb-6">📍 Address Book</h2>

      {/* Add New Address Button */}
      <button
        onClick={() => handleOpenModal()}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 flex items-center"
      >
        <FaPlus className="mr-2" /> Add New Address
      </button>

      {/* Address List */}
      <div className="grid gap-4">
        {Array.isArray(addresses) && addresses.length > 0 ? (
          addresses.map((address) => (
            <div key={address._id} className="p-4 border rounded-md shadow-md">
              <h3 className="font-bold">{address.name}</h3>
              <p>
                {address.street}, {address.city}, {address.state}, {address.zip},{" "}
                {address.country}
              </p>
              <p className="text-gray-600">{address.phone}</p>

              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => handleOpenModal(address)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-md flex items-center"
                >
                  <FaEdit className="mr-1" /> Edit
                </button>

                <button
                  onClick={() => handleDelete(address._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md flex items-center"
                >
                  <FaTrash className="mr-1" /> Delete
                </button>

                {!address.isDefault && (
                  <button
                    onClick={() => handleSetDefault(address._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded-md flex items-center"
                  >
                    <FaCheckCircle className="mr-1" /> Set Default
                  </button>
                )}
              </div>

              {address.isDefault && (
                <p className="text-green-600 font-semibold mt-2">✔ Default Address</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No addresses found.</p>
        )}
      </div>

      {/* Address Modal */}
      {showModal && (
        <AddressForm
          address={currentAddress}
          closeModal={() => setShowModal(false)}
          refreshAddresses={fetchAddresses}
        />
      )}
    </div>
  );
};

// ================== Address Form (Inside Same File) ==================
const AddressForm = ({ address, closeModal, refreshAddresses }) => {
  const [formData, setFormData] = useState(
    address || { name: "", phone: "", street: "", city: "", state: "", zip: "", country: "" }
  );
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [geoapifyApiKey, setGeoapifyApiKey] = useState("b82ccd10fd2f4c1f9f4c975a04107a7d");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Trigger autocomplete only for relevant fields (e.g., street, city)
    if (name === "street" || name === "city") {
      fetchAutocompleteResults(value);
    }
  };

  const fetchAutocompleteResults = async (text) => {
    try {
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&apiKey=${geoapifyApiKey}`
      );
      const data = await response.json();
      setAutocompleteResults(data.features);
    } catch (error) {
      console.error("Error fetching autocomplete results:", error);
      setAutocompleteResults([]);
    }
  };

  const selectAutocompleteResult = (result) => {
    // Update form data based on selected result
    setFormData({
      ...formData,
      street: result.properties.address_line1 || "",
      city: result.properties.city || result.properties.county || "",
      state: result.properties.state || "",
      zip: result.properties.postcode || "",
      country: result.properties.country || "",
    });
    setAutocompleteResults([]); // Clear results after selection
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = address ? "PUT" : "POST";
    const url = address
      ? `http://localhost:5000/api/addresses/${address._id}`
      : "http://localhost:5000/api/addresses";

    try {
      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });
      refreshAddresses();
      closeModal();
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">{address ? "Edit Address" : "Add New Address"}</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
          <input
            type="text"
            name="street"
            placeholder="Street Address"
            value={formData.street}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
            // AutoComplete
            list="autocomplete-results" // Link to the datalist
          />
          {autocompleteResults && autocompleteResults.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border rounded-md shadow-md">
              {autocompleteResults.map((result) => (
                <li
                  key={result.properties.place_id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => selectAutocompleteResult(result)}
                >
                  {result.properties.formatted}
                </li>
              ))}
            </ul>
          )}
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
          <input
            type="text"
            name="zip"
            placeholder="Zip Code"
            value={formData.zip}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />

          <div className="flex justify-between mt-4">
            <button type="button" onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded-md">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
              {address ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressBook;
