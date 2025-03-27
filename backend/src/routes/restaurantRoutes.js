const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant");
const jwt = require("jsonwebtoken");

// Middleware for authentication (Replace with actual authentication logic)
const authenticate = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ message: "Access denied. no token provided." });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; // Assuming the token contains user ID
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
};

//  Get all restaurants
router.get("/", async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const restaurants = await Restaurant.find()
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ message: "Error fetching restaurants", error: error.message });
    }
});

//  Get a restaurant by ID
router.get("/:restaurantId", async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.restaurantId);
        if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

        res.json(restaurant);
    } catch (error) {
        res.status(500).json({ message: "Error fetching restaurant", error });
    }
});

//  Add a new restaurant (Admin feature)
router.post("/", authenticate, async (req, res) => {
    try {
        const { name, location, cuisine, rating, menu } = req.body;

        if (!name || !location || !cuisine || !rating || !menu) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newRestaurant = new Restaurant({
            name,
            location,
            cuisine,
            rating,
            menu
        });

        const savedRestaurant = await newRestaurant.save();
        res.status(201).json(savedRestaurant);
    } catch (error) {
        res.status(500).json({ message: "Error adding restaurant", error: error.message });
    }
});

//  Update restaurant details
router.put("/:restaurantId", authenticate, async (req, res) => {
    try {
        const { name, location, cuisine, rating, menu } = req.body;

        if (!name && !location && !cuisine && !rating && !menu) {
            return res.status(400).json({ message: "At least one field is required to update" });
        }

        const updatedRestaurant = await Restaurant.findByIdAndUpdate(
            req.params.restaurantId,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedRestaurant) return res.status(404).json({ message: "Restaurant not found" });

        res.json(updatedRestaurant);
    } catch (error) {
        res.status(500).json({ message: "Error updating restaurant", error });
    }
});

//  Delete a restaurant (Admin feature)
router.delete("/:restaurantId", authenticate, async (req, res) => {
    try {
        const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.restaurantId);
        if (!deletedRestaurant) return res.status(404).json({ message: "Restaurant not found" });

        res.json({ message: "Restaurant deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting restaurant", error });
    }
});

module.exports = router;
