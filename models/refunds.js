const mongoose = require('mongoose');

const refundSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true
    },
    refundAmount: {
        type: String,
        require: true
    },
    requestDate: {
        type: String,
        required: true
    },
    bankName: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    }, 
    accNo: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Refund', refundSchema);