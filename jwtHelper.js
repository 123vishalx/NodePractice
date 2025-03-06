const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.JWT_SECRET || "defaultSecretKey";

// Function to generate JWT Token
const generateToken = (admin) => {
    return jwt.sign(
        { id: admin._id, username: admin.username },
        SECRET_KEY,
        { expiresIn: "1h" }
    );
};

module.exports = { generateToken };
