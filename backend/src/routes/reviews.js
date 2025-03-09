const mongoose = require("mongoose");
const router = express.Router();
const reviewSchema = new mongoose.Schema({
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        maxlength: 500,
    },
}, { timestamps: true });

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
