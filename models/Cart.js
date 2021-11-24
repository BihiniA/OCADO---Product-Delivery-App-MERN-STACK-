//import Buyer from './Buyer';
//import Product from './Product';
const mongoose = require('mongoose');


const cartSchema = new mongoose.Schema({
   productName : {
       type: String,
       required: true,
   },
    price : {
        type : Number,
        required: true,
    },
    qty : {
        type : Number,
        required: true,
    },
    buyerId : {
        type : String,
        required: true,
    },
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;