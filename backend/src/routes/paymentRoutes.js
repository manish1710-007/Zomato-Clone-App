const express = require("express");
const router = express.Router();
const stripe = require("../config/stripe");
const { authenticate } = require("../middleware/authMiddleware");
const Payment = require("../models/payment");

// Create a new payment intent
router.post("/create-payment-intent", authenticate, async (req, res) => {
    const { amount, currency } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,  // Convert to smallest currency unit (cents)
            currency,
            payment_method_types: ["card"],
        });
        res.json({
            clientSecret: paymentIntent.client_secret,
        });

        // save transaction details to MongoDB
        const payment = new Payment({
            userId,
            amount,
            currency,
            status: "pending",
            transactionId: paymentIntent.id,
        });
        await payment.save();

        res.json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error("Error creating payment intent:", error);
        res.status(500).json({ message: "Error creating payment intent", error });
    }
});

//Webhook to update payment status 
router.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
    const sig = req.headers["stripe-signature"];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;  // Set in .env

    try {
        const event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);

        if (event.type === "payment_intent.succeeded") {
            const paymentIntent = event.data.object;
            await Payment.findOneAndUpdate(
                { transactionId: paymentIntent.id },
                { status: "succeeded" }
            );
        } else if (event.type === "payment_intent.payment_failed") {
            const paymentIntent = event.data.object;
            await Payment.findOneAndUpdate(
                { transactionId: paymentIntent.id },
                { status: "failed" }
            );
        }

        res.json({ received: true });
    } catch (err) {
        console.error("Webhook error:", err.message);
        res.status(400).send(`Webhook Error: ${err.message}`);
    }
});

module.exports = router;
