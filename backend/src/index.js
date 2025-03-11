const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

// Import routes and models
const reviewRoutes = require("./routes/reviewRoutes");
const favouriteRoutes = require("./routes/favouritesRoutes");
const recommendationsRoutes = require("./routes/recommendations");
const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const Order = require("./models/order");
const { authenticate } = require("./middleware/authMiddleware");
const { errorHandler } = require("./middleware/errorMiddleware");

//Payment

const paymentRoutes = require("./routes/paymentRoutes");
app.use("/api/payments", paymentRoutes);

// Initialize Express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: { origin: "http://localhost:3000" }
});

// Connect to MongoDB Atlas
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: "secret_key",
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// Google OAuth Routes
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
app.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), (req, res) => {
    res.redirect("http://localhost:3000"); // Redirect to frontend
});

// Logout Route
app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("http://localhost:3000");
});

// Current User Route
app.get("/api/current_user", (req, res) => {
    res.send(req.user);
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/restaurants", authenticate, restaurantRoutes);
app.use("/api/orders", authenticate, orderRoutes);
app.use("/api/recommendations", recommendationsRoutes);
app.use("/reviews", reviewRoutes);
app.use("/favourites", favouriteRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Socket.io for order tracking
io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("track-order", async (orderId) => {
        try {
            const order = await Order.findById(orderId);
            if (order) {
                socket.emit("order-update", order);  // Fix event name to lowercase for consistency
            }
        } catch (error) {
            console.error("Error finding order:", error);
        }
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});

// Start Server
const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
