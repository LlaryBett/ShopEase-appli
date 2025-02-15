const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        customerName: {
            type: String,
            required: true,
        },
        customerEmail: {
            type: String,
            required: true,
        },
        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
            },
        ],
        shippingAddress: {
            street: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
            state: {
                type: String,
                required: true,
            },
            postalCode: {
                type: String,
                required: true,
            },
            country: {
                type: String,
                required: true,
            },
        },
        paymentMethod: {
            type: String,
            required: true,
            enum: ["Credit Card", "PayPal", "M-Pesa", "Bank Transfer"],
        },
        orderTotal: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
            default: "Pending",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
