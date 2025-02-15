

const Address = require("../models/Address");

// Get all addresses (Admin use case)
const getAddresses = async (req, res) => {
    try {
        const addresses = await Address.find({});
        res.json(addresses);
    } catch (error) {
        console.error("Error fetching addresses:", error);
        res.status(500).json({ message: "Failed to fetch addresses", error: error.message });
    }
};

// Create a new address
const createAddress = async (req, res) => {
    try {
        const { street, city, county, zipCode, country, pickupStations } = req.body;

        if (!street || !city || !county || !zipCode || !country) {
            return res.status(400).json({ message: "All address fields are required." });
        }

        const newAddress = new Address({
            street,
            city,
            county,
            zipCode,
            country,
            pickupStations: pickupStations || [], // Default to an empty array if not provided
        });

        const savedAddress = await newAddress.save();
        res.status(201).json(savedAddress);
    } catch (error) {
        console.error("Error creating address:", error);
        res.status(400).json({ message: "Failed to create address", error: error.message });
    }
};

// Get a specific address by ID
const getAddressById = async (req, res) => {
    try {
        const address = await Address.findById(req.params.id);
        if (!address) {
            return res.status(404).json({ message: "Address not found" });
        }
        res.json(address);
    } catch (error) {
        console.error("Error fetching address:", error);
        res.status(500).json({ message: "Failed to fetch address", error: error.message });
    }
};

// Update an existing address
const updateAddress = async (req, res) => {
    try {
        console.log("Update Address Payload:", req.body); // Log incoming data

        const { street, city, county, zipCode, country, pickupStations } = req.body;

        const updatedAddress = await Address.findByIdAndUpdate(
            req.params.id,
            {
                street,
                city,
                county,
                zipCode,
                country,
                pickupStations: pickupStations || [],
            },
            { new: true, runValidators: true }
        );

        if (!updatedAddress) {
            return res.status(404).json({ message: "Address not found" });
        }

        res.json(updatedAddress);
    } catch (error) {
        console.error("Error updating address:", error);
        res.status(400).json({ message: "Failed to update address", error: error.message });
    }
};


// Delete an address
const deleteAddress = async (req, res) => {
    try {
        const deletedAddress = await Address.findByIdAndDelete(req.params.id);
        if (!deletedAddress) {
            return res.status(404).json({ message: "Address not found" });
        }
        res.json({ message: "Address deleted successfully" });
    } catch (error) {
        console.error("Error deleting address:", error);
        res.status(500).json({ message: "Failed to delete address", error: error.message });
    }
};

module.exports = {
    getAddresses,
    createAddress,
    getAddressById,
    updateAddress,
    deleteAddress,
};
