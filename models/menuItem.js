const mongoose = require('mongoose');

//schema
const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    taste:{
        type: String,
        enum: ['sweet', 'sour', 'spicy'],
        reqired: true
    },
    is_drink:{
        type: Boolean,
        default: false,
    },
    ingredients:{
        type: [String],
        default: [],
    },
    num_sales:{
        type: Number,
        default: 0,
    },

});

//menu model
const MenuItem = mongoose.model('MenuItem', menuItemSchema)
module.exports = MenuItem