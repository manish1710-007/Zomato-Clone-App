const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Restaurant = require("../models/Restaurant");

// Middleware for authentication
const authenticate = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; // Assuming the token contains the user ID
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
};

// Get user favourites
router.get("/", authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.userId).populate("favourites");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ favourites: user.favourites });
    } catch (error) {
        res.status(500).json({ message: "Error fetching favourites", error: error.message });
    }
});

// Add a restaurant to favourites
router.post("/:restaurantId", authenticate, async (req, res) => {
    try {
        const { restaurantId } = req.params;

        // Validate restaurant existence
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        const user = await User.findByIdAndUpdate(
            req.userId,
            { $addToSet: { favourites: restaurantId } },
            { new: true }
        ).populate("favourites");

        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ favourites: user.favourites });
    } catch (error) {
        res.status(500).json({ message: "Error adding to favourites", error: error.message });
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
        ).populate("favourites");

        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ favourites: user.favourites });
    } catch (error) {
        res.status(500).json({ message: "Error removing from favourites", error: error.message });
    }
});

module.exports = router;
