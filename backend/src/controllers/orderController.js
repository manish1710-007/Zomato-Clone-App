const Order = require("../models/order");

// Place Order
exports.placeOrder = async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get Order by ID
exports.getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (!order) return res.status(404).json({ error: "Order not found" });
        res.json(order);
    } catch (error) {
        console.error("Error fetching order:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
