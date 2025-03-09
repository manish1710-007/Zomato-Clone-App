const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');

// get all restaurants with sorting

router.get("/", async (req, res) => {
    try{
        const { sortBy = "rating", order = "desc"} = req.query;
        const sortOptions = {
            price: {price: order === "asc" ? 1 : -1},
            rating: {rating: order === "asc" ? 1 : -1},
            distance: {distance: order === "asc" ? 1 : -1}
        };
        const sortCritiria = sortOptions[sortBy] || sortOptions["rating"];
        const restaurants = await Restaurant.find().sort(sortCritiria);
        res.json(restaurants);    

    } catch (error) {
        res.status(400).send(error);
    }
});  

module.exports = router;