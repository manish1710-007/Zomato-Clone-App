const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const { authenticate } = require("../middleware/authMiddleware");

// ➤ Add a review for a restaurant
router.post("/:restaurantId", authenticate, async (req, res) => {
    const { restaurantId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user._id;

    try {
        const newReview = new Review({
            restaurant: restaurantId,
            user: userId,
            rating,
            comment,
        });

        await newReview.save();
        res.status(201).json({ message: "Review added successfully!", review: newReview });
    } catch (error) {
        console.error("Error adding review:", error);
        res.status(500).json({ message: "Failed to add review." });
    }
});

// ➤ Get all reviews for a restaurant
router.get("/:restaurantId", async (req, res) => {
    const { restaurantId } = req.params;

    try {
        const reviews = await Review.find({ restaurant: restaurantId }).populate("user", "name");
        res.json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ message: "Failed to fetch reviews." });
    }
});

// ➤ Delete a review (only by the review owner)
router.delete("/:reviewId", authenticate, async (req, res) => {
    const { reviewId } = req.params;
    const userId = req.user._id;

    try {
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: "Review not found." });
        }

        if (review.user.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Unauthorized to delete this review." });
        }

        await Review.findByIdAndDelete(reviewId);
        res.json({ message: "Review deleted successfully." });
    } catch (error) {
        console.error("Error deleting review:", error);
        res.status(500).json({ message: "Failed to delete review." });
    }
});

module.exports = router;
