const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    restaurantId: {type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true},
    items: [
        {
            dishId: { type: mongoose.Schema.Types.ObjectId, ref: "Dish" },
            quantity: { type: Number, default: 1 },
        }
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ["Pending", "Preparing", "On the Way", "Delivered"], default: "Pending" },
    orderDates: { typr: Date, default: Date.now},
    deliveryPerson: {
        name: { type: String },
        contact: { type: String },
        loaction: {
            lat: { type: Number },
            lng: { type: Number },
        }
    },
    createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("orde", orderSchema);
module.exports = Order;