const mongoose = require('mongoose');

const Order_product = mongoose.Schema({
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer_order"
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity: {
        type: Number
    }
})

module.exports = mongoose.model("Order_product",Order_product);