const mongoose = require('mongoose');

const Product = mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    price: {
        type: Number,
        require: true
    },
    detail: {
        type: String,
        require: true
    },
    amount: {
        type: Number,
        require: true,
        min: 0
    },
    image1: {
        type: String
    },
    image2: {
        type: String
    },
    image3: {
        type: String
    },
    last_update: {
        type: Date
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    sold: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Product',Product);