const mongoose = require("mongoose");

const pickupStationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});

const addressSchema = new mongoose.Schema({
    street: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    county: { // Updated to include county
        type: String,
        required: true,
    },
    zipCode: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    pickupStations: [pickupStationSchema], // Array of pickup station objects
});

module.exports = mongoose.model("Address", addressSchema);
