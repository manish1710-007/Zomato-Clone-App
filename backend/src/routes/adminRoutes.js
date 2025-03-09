const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurant");
const { authenticate, isAdmin } = require("../middleware/authMiddleware");

// Admin-only: Add restaurant
router.post("/add", authenticate, isAdmin, async (req, res) => {
    try {
        const newRestaurant = new Restaurant(req.body);
        await newRestaurant.save();
        res.status(201).json({ message: "Restaurant added successfully!" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
