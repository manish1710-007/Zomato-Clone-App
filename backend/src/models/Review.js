const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    restaurantId: {type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true},
    user: {type: String, required: true},
    rating: {type: Number, required: true, min: 1, max: 5},
    comment: {type: String, required: true},
    date: {type: Date, default: Date.now}
}); 

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;