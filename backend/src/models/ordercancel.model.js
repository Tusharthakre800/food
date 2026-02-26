const mongoose = require('mongoose');



const orderCancelSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cancelReason: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const OrderCancel = mongoose.model('OrderCancel', orderCancelSchema);

module.exports = OrderCancel;