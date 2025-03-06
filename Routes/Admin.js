const express = require("express");
const router = express.Router();
const { loginAdmin, registerAdmin } = require("../controllers/admin.controller");

// Admin Registration Route
router.post("/register", registerAdmin);

// Admin Login Route
router.post("/login", loginAdmin);

module.exports = router;
