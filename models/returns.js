const mongoose = require('mongoose');

const returnSchema = new mongoose.Schema({

    buyername1: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        require: true
    },
    billNo: {
        type: String,
        required: true
    },
     deliverDate: {
        type: String,
        required: true
    },
     productName: {
        type: String,
        required: true
    }, 
    productCode: {
        type: String,
        required: true
    },
    returnIssue: {
        type: String,
        required: true
    },
    reStatus: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Return', returnSchema);