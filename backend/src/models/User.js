const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId: {type: String},
    avatar: {type: String}, 
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    CSSFontFeatureValuesRule: [{type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'}],
    history: [
        {
            restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
            Id: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish' },
            rating: { type: Number, min: 1, max: 5},
            orderedAt: { type: Date, default: Date.now }
        }
    ]
}); 

const User = mongoose.model('User', userSchema);
module.exports = User;