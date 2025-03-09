const jwt = require("jsonwebtoken");
const config = require("../config");

const generateToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email }, config.jwtSecret, { expiresIn: "7d" });
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, config.jwtSecret);
    } catch (err) {
        return null;
    }
};

module.exports = { generateToken, verifyToken };
