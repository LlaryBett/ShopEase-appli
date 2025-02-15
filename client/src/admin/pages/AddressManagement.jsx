import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus, faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";


const AddressManagement = () => {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newAddress, setNewAddress] = useState({
        street: "",
        city: "",
        county: "",
        zipCode: "",
        country: "Kenya",
        pickupStations: [],
    });
    const [editingAddressId, setEditingAddressId] = useState(null);
    const [newPickupStation, setNewPickupStation] = useState("");

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:5000/api/addresses");
            if (Array.isArray(response.data)) {
                setAddresses(response.data);
            } else {
                setError("API returned invalid data");
                toast.error("Invalid address format");
            }
        } catch (err) {
            setError(err.message || "Failed to fetch addresses");
            toast.error("Failed to fetch addresses");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAddress((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddPickupStation = () => {
        if (newPickupStation.trim() !== "") {
            setNewAddress((prev) => ({
                ...prev,
                pickupStations: [...prev.pickupStations, { name: newPickupStation.trim() }], // Store as objects
            }));
            setNewPickupStation("");
        }
    };

    const handleRemovePickupStation = (index) => {
        setNewAddress((prev) => ({
            ...prev,
            pickupStations: prev.pickupStations.filter((_, i) => i !== index),
        }));
    };

    const handleAddAddress = async () => {
        try {
            await axios.post("http://localhost:5000/api/addresses", newAddress);
            toast.success("Address added successfully!");
            setNewAddress({ street: "", city: "", county: "", zipCode: "", country: "Kenya", pickupStations: [] });
            setShowAddForm(false);
            fetchAddresses();
        } catch (err) {
            toast.error("Failed to add address");
        }
    };

    const handleEditAddress = (id) => {
        setEditingAddressId(id);
        const addressToEdit = addresses.find((address) => address._id === id);
        if (addressToEdit) {
            setNewAddress({
                _id: addressToEdit._id,
                street: addressToEdit.street,
                city: addressToEdit.city,
                county: addressToEdit.county,
                zipCode: addressToEdit.zipCode,
                country: addressToEdit.country,
                pickupStations: addressToEdit.pickupStations || [],
            });
        }
    };

    const handleUpdateAddress = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/addresses/${id}`, newAddress);
            toast.success("Address updated successfully!");
            setEditingAddressId(null);
            setNewAddress({ street: "", city: "", county: "", zipCode: "", country: "Kenya", pickupStations: [] });
            fetchAddresses();
        } catch (err) {
            toast.error("Failed to update address");
        }
    };

    const handleDeleteAddress = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/addresses/${id}`);
            toast.success("Address deleted successfully!");
            fetchAddresses();
        } catch (err) {
            toast.error("Failed to delete address");
        }
    };

    // Styles for consistent button appearance
    const buttonStyle = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Address Management</h2>
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={() => setShowAddForm(true)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add Address
                </button>
            </div>

            {loading ? (
                <p>Loading addresses...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="bg-white shadow-md rounded my-6 overflow-x-auto"> {/* Added overflow-x-auto */}
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Street</th>
                                <th className="py-3 px-6 text-left">City</th>
                                <th className="py-3 px-6 text-left">County</th>
                                <th className="py-3 px-6 text-left">Zip Code</th>
                                <th className="py-3 px-6 text-left">Country</th>
                                <th className="py-3 px-6 text-left">Pickup Stations</th>
                                <th className="py-3 px-6 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {addresses.map((address) => (
                                <tr key={address._id} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left">{address.street}</td>
                                    <td className="py-3 px-6 text-left">{address.city}</td>
                                    <td className="py-3 px-6 text-left">{address.county}</td>
                                    <td className="py-3 px-6 text-left">{address.zipCode}</td>
                                    <td className="py-3 px-6 text-left">{address.country}</td>
                                    <td className="py-3 px-6 text-left">
                                        {address.pickupStations && address.pickupStations.map((station, index) => (
                                            <div key={index} className="mb-1">
                                                {station.name}
                                            </div>
                                        ))}
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        <div className="flex item-center justify-center">
                                            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                <FontAwesomeIcon icon={faEdit} onClick={() => handleEditAddress(address._id)} style={{ cursor: 'pointer' }} />
                                            </div>
                                            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                <FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteAddress(address._id)} style={{ cursor: 'pointer' }} />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {addresses.length === 0 && <p className="text-center py-4">No addresses found.</p>}
                </div>
            )}

            {showAddForm && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4">Add Address</h3>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="street">Street</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="street" type="text" name="street" value={newAddress.street} onChange={handleInputChange} placeholder="Street" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">City</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="city" type="text" name="city" value={newAddress.city} onChange={handleInputChange} placeholder="City" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="county">County</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="county" type="text" name="county" value={newAddress.county} onChange={handleInputChange} placeholder="County" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="zipCode">Zip Code</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="zipCode" type="text" name="zipCode" value={newAddress.zipCode} onChange={handleInputChange} placeholder="Zip Code" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">Country</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="country" type="text" name="country" value={newAddress.country} onChange={handleInputChange} placeholder="Country" />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pickupStations">Pickup Stations</label>
                            {newAddress.pickupStations && newAddress.pickupStations.map((station, index) => (
                                <div key={index} className="flex items-center mb-2">
                                    <span className="mr-2">{station.name}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemovePickupStation(index)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <div className="flex">
                                <input
                                    type="text"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                                    placeholder="Add Pickup Station"
                                    value={newPickupStation}
                                    onChange={(e) => setNewPickupStation(e.target.value)}
                                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddPickupStation(); } }} //Prevent refresh when enter is pressed
                                />
                                <button
                                    type="button"
                                    onClick={handleAddPickupStation}
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Add
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button onClick={handleAddAddress} className={`${buttonStyle} mr-2`}>
                                <FontAwesomeIcon icon={faSave} className="mr-2" /> Save
                            </button>
                            <button onClick={() => setShowAddForm(false)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                <FontAwesomeIcon icon={faTimes} className="mr-2" /> Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {editingAddressId && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4">Edit Address</h3>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="street">Street</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="street" type="text" name="street" value={newAddress.street} onChange={handleInputChange} placeholder="Street" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">City</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="city" type="text" name="city" value={newAddress.city} onChange={handleInputChange} placeholder="City" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="county">County</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="county" type="text" name="county" value={newAddress.county} onChange={handleInputChange} placeholder="County" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="zipCode">Zip Code</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="zipCode" type="text" name="zipCode" value={newAddress.zipCode} onChange={handleInputChange} placeholder="Zip Code" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">Country</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="country" type="text" name="country" value={newAddress.country} onChange={handleInputChange} placeholder="Country" />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pickupStations">Pickup Stations</label>
                            {newAddress.pickupStations && newAddress.pickupStations.map((station, index) => (
                                <div key={index} className="flex items-center mb-2">
                                    <span className="mr-2">{station.name}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemovePickupStation(index)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <div className="flex">
                                <input
                                    type="text"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                                    placeholder="Add Pickup Station"
                                    value={newPickupStation}
                                    onChange={(e) => setNewPickupStation(e.target.value)}
                                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddPickupStation(); } }} //Prevent refresh when enter is pressed
                                />
                                <button
                                    type="button"
                                    onClick={handleAddPickupStation}
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Add
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button onClick={() => handleUpdateAddress(editingAddressId)} className={`${buttonStyle} mr-2`}>
                                <FontAwesomeIcon icon={faSave} className="mr-2" /> Update
                            </button>
                            <button onClick={() => setEditingAddressId(null)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                <FontAwesomeIcon icon={faTimes} className="mr-2" /> Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default AddressManagement;
