const dotenv = require("dotenv");
dotenv.config(); // Load .env variables

module.exports = {
    port: process.env.PORT || 5000,
    mongoURI: process.env.MONGO_URI,       // Load MongoDB URI from .env
    jwtSecret: process.env.JWT_SECRET,     // Load JWT secret from .env
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,  // Google Maps API key
    stripeSecretKey: process.env.STRIPE_SECRET_KEY, // Stripe secret key 
    stripePublicKey: process.env.STRIPE_PUBLIC_KEY, // Stripe public key 
};
