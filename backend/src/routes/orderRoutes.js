const express = require("express");
const router = express.Router();
const Order = require("../models/order");

// Place an Order
router.post("/", async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Get Order Status
router.get("/:orderId", async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (!order) return res.status(404).json({ error: "Order not found" });
        res.json(order);
    } catch (error) {
        console.error("Error fetching order:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
