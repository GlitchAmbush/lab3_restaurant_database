const { Int32 } = require('bson');
const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
    address: {
        building: {
            type: String,
            trim: true
        },
        street: {
            type: String,
            required: [true, "Please enter street"]
        },
        zipcode: {
            type: String
        }
    },
    city: {
        type: String,
        required: [true, "Please enter city"]
    },
    cuisine: {
        type: String,
        required: [true, "Please enter cuisine type"]
    },
    name: {
        type: String,
        required: [true, "Please enter name"]
    },
    restaurant_id: {
        type: Number,
        required: [true, "Please enter id"]
    }
});


RestaurantSchema.post('init', (doc) => {
    console.log('%s has been initiazlized from the db', doc._id);
});

RestaurantSchema.post('validate', (doc) => {
    console.log('%s has been validated (but not saved yet)', doc._id);
});

const Restaurant = mongoose.model("Restraunt", RestaurantSchema);
module.exports = Restaurant;