const jwt = require("jsonwebtoken");
const config = require("../config");

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    jwt.verify(token, config.jwtSecret, (err, user) => {
        if (err) return res.status(401).json({ error: "Invalid token" });
        req.user = user;
        next();
    });
};

const isAdmin = (req, res, next) => {
    if (req.user?.role !== "admin") return res.status(403).json({ error: "Forbidden" });
    next();
};

module.exports = { authenticate, isAdmin };
