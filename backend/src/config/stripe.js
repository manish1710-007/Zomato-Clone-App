const Stripe = require("stripe");
const dotenv = require("dotenv");
dotenv.config();

// Ensure the secret key is defined
if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not defined in the environment variables");
}

// Log the Stripe Secret Key
console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY);

// Initialize Stripe with the secret key
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = stripe;
