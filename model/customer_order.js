const mongoose = require('mongoose');

const Customer_order = mongoose.Schema({
    total: {
        type: Number
    },
    date_created: {
        type: Date
    },
    confirm_number: {
        type: Number
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "onModel",
        required: true
    },
    onModel: {
        type: String,
        required: true,
        enum: ["User", "Customer"]
    }
})

module.exports = mongoose.model("Customer_order",Customer_order);