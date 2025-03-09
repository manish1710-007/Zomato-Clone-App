const Restaurant = require("../models/Restaurant");

// Get All Restaurants
exports.getRestaurants = async (req, res) => {
    try {
        const { sortBy = "rating", order = "desc" } = req.query;
        const restaurants = await Restaurant.find().sort({ [sortBy]: order === "asc" ? 1 : -1 });
        res.json(restaurants);
    } catch (error) {
        console.error("Error fetching restaurants:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Create Restaurant
exports.createRestaurant = async (req, res) => {
    try {
        const newRestaurant = new Restaurant(req.body);
        await newRestaurant.save();
        res.status(201).json(newRestaurant);
    } catch (error) {
        console.error("Error creating restaurant:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
