const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    cuisine: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    address: {
        street: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        postalCode: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            default: "India",  // Default to India, change if needed
        },
    },
    coordinates: {
        type: {
            type: String,
            default: "Point",
        },
        coordinates: {
            type: [Number],  // [longitude, latitude]
            required: true,
        },
    },
    distance: {
        type: Number,
        default: 0,  // Distance from user in kilometers, will be calculated dynamically
    },
    image: {
        type: String,
        default: "",  // URL to the restaurant image
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
    reviews: [
        {
            user: {
                type: String,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
                min: 1,
                max: 5,
            },
            date: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    menu: [
        {
            name: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            description: {
                type: String,
                default: "",
            },
            image: {
                type: String,
                default: "",  // URL to the dish image
            },
        },
    ],
    contact: {
        phone: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            default: "",
        },
    },
    hours: {
        open: {
            type: String,
            default: "10:00 AM",
        },
        close: {
            type: String,
            default: "10:00 PM",
        },
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
}, { 
    timestamps: true 
});

// Create a geospatial index on coordinates to enable proximity searches
restaurantSchema.index({ coordinates: "2dsphere" });

module.exports = mongoose.model("Restaurant", restaurantSchema);
