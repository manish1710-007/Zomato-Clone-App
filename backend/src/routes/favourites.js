const express = require('express');
const router = express.Router();
const User =  require('../models/User');
const Restaurant = require('../models/Restaurant');

//Middleware for authentication 
const authenticate = (req, res, next) => {
    req.userId = "user123";
    next();
};

// get user favourites
router.get("/", authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.userId).populate("favourites");
        res.send(user.favourites);
    } catch (error) {
        res.status(500).send(error);
    }
});

// add a restaurant to favourites
router.post("/:restaurantId", authenticate, async (req, res) => {
    try {
        const { restaurantId } = req.body;
        const user = await User.findByIdAndUpdate(
            req.userId, 
            { $addToSet: { favourites: req.params.restaurantId } },
            { new: true }
        );
        res.send(user.favourites);
    }catch (error) {
        res.status(500).send(error);
    }   
});

// Remove a restaurant from favourites
router.delete("/:restaurantId", authenticate, async (req, res) => {
    try {
        const { restaurantId } = req.params;
        const user = await User.findByIdAndUpdate(
            req.userId,
            { $pull: { favourites: restaurantId } },
            { new: true }
        );
        res.send(user.favourites);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
