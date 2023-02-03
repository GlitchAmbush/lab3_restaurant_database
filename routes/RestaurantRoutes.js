const express = require('express');
const restaurantModel = require('../models/Restaurant');
const app = express();

//Read ALL
//http://localhost:3000/restaurants
//
//Sort by Ascending/Descending ID
//http://localhost:3000/restaurants?sortBy=ASC
app.get('/restaurants', async (req, res) => {
    const restaurants = await restaurantModel.find({})
                                            //.select("_id city cuisine name restaurant_id")
                                            .sort({'restaurant_id': req.query.sortBy});

    try {
        console.log(restaurants[0].name)
        res.status(200).send(restaurants);
    } catch (err) {
        res.status(500).send(err);
    }
});

//Read by cuisine
//http://localhost:3000/restaurants/cuisine/Japanese
app.get('/restaurants/cuisine/:cuisine', async (req, res) => {
    const cuisine = req.params.cuisine;
    const restaurants = await restaurantModel.find({cuisine : cuisine});

    try {
        if (restaurants.length != 0) {
            res.send(restaurants);
        } else {
            res.send(JSON.stringify({status:false, message: "No data found"}));
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

//Find cuisine == 'Delicatessen' AND city != 'Brooklyn'
//http://localhost:3000/restaurants/Delicatessen
app.get('/restaurants/Delicatessen', async (req, res) => {
    const restaurants = await restaurantModel.find({cuisine: 'Delicatessen', city: { $ne: 'Brooklyn'}})
                                             .select("city cuisine name -_id")
                                             .sort({'name' : 1});

    try {
        res.status(200).send(restaurants);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Insert new records
//http://localhost:3000/insert-restaurant
app.post('/insert-restaurant', (req, res) => {    
    restaurantModel.insertMany(req.body).then((restaurant) => {
        res.send(restaurant);
    }).catch((error) => {
        res.status(500).send(error);
    });
});

module.exports = app