const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/User");
const { authenticate } = require("../middleware/authMiddleware");
const config = require("../config");


//  Forgot Password Route
router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const token = crypto.randomBytes(20).toString("hex");
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiry
        await user.save();

        // Configure Nodemailer
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "your-email@gmail.com",
                pass: "your-email-password",
            },
        });

        const mailOptions = {
            to: user.email,
            from: "no-reply@zomato-clone.com",
            subject: "Password Reset Request",
            text: `You are receiving this because you requested a password reset.\n\n
            Click the following link to reset your password:\n
            http://localhost:3000/reset-password/${token}\n\n
            If you didn't request this, ignore this email.`,
        };

        transporter.sendMail(mailOptions, (err) => {
            if (err) console.error("Error sending email:", err);
            res.json({ message: "Password reset email sent!" });
        });
    } catch (error) {
        console.error("Error in forgot-password:", error);
        res.status(500).json({ message: "Server error" });
    }
});

//  Reset Password Route
router.post("/reset-password/:token", async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) return res.status(400).json({ message: "Invalid or expired token" });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.json({ message: "Password has been reset successfully!" });
    } catch (error) {
        console.error("Error in reset-password:", error);
        res.status(500).json({ message: "Server error" });
    }
});

//  Register a new user
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });
        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, config.jwtSecret, { expiresIn: "1h" });
        res.status(201).json({ token, user: { id: newUser._id, name: newUser.name, email: newUser.email } });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

//  User login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ userId: user._id }, config.jwtSecret, { expiresIn: "1h" });
        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

//  Get user profile 
router.get("/profile", authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error("Profile error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// route for admin login 
router.post("/admin/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && user.role === 'admin') {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign({ id: user._id, role: user.role }, config.jwtSecret);
            res.json({ token });
        } else {
            res.status(401).json({ error: "Invalid credentials" });
        }
    } else {
        res.status(401).json({ error: "Not authorized" });
    }
});


module.exports = router;
