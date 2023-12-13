const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    items: [
        {
            dishId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Dish',
                required: true
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'completed'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const OrderModel = mongoose.model('order', orderSchema, 'orders');

module.exports = OrderModel;