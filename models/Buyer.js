const mongoose = require('mongoose');


const BuyerSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        businessId: {
            type: String,
            required: true,
        },
        businessLocation: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: Number,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

const Buyer = mongoose.model('Buyer', BuyerSchema);

module.exports = Buyer;