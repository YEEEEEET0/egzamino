const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    usersRated: {
        type: Array
    }
});

const DishModel = mongoose.model('dish', dishSchema, 'dishes');

module.exports = DishModel;