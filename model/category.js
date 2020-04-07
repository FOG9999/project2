const mongoose = require('mongoose');

const Category = mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    image: {
        type: String
    }
})

module.exports = mongoose.model("Category",Category);