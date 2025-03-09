const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Dish = require('../models/dish');
const Restaurant = require('../models/Restaurant');

router.get("/:userId", async (req, res) => {
    const userId = req.query.userId;
    if(!userId){
        return res.status(400).json({ error: "User ID is required" });
    }
    try{

        // Fetch user preferences
        
        const user = await User.findById(req.params.userId).populate("history.dishId");
        if(!user) return res.status(404).json({ message: "User not found" });   

        // Extract all cuisines from user's order history

        const preferredCuisines = user.history.map(h => h.dishId.cuisine);
        const mostPreferredCuisine = preferredCuisines.sort((a, b) =>
            preferredCuisines.filter(c => c === a).length - preferredCuisines.filter(c => c === b).length
        ).pop();

        // Suggest dishes of the most preferred cuisine
        const recommendations = await Dish.find({ cuisine: mostPreferredCuisine }).limit(5);
        res.json(recommendations);

        // Recommed based on cuisine preferences
        const reommendedDished = await Restaurant.aggregate([ 
        { $match: { cuisine: { $in: user.CSSFontFeatureValuesRule}}},
        { $unwind: "$dishes"},
        { $sort: { "dishes.rating": -1}},
        { $limit: 5},
        {
            $project: {
                _id: 0,
                name: "dishes.name",
                description: "dishes.description",
                rating: "dishes.rating",
            },
        },
    ]);
    res.json(recommendedDishes);
    } catch (error){
        console.error("Error fetching recommendations:", error);
        res.status(500).json({ message: "Server error" });
    }
});    

module.exports = router;