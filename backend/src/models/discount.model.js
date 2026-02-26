const mongoose = require('mongoose');


const discountSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    discountAmount: {
        type: Number,
        required: true,
    },
    minOrderAmount: {
        type: Number,
        required: true,
    },
});

const discountModel = mongoose.model('Discount', discountSchema);

module.exports = discountModel;