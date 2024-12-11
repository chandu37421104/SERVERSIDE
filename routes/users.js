const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");
const roleMiddleware = require("../middleware/role");

const router = express.Router();

// Get all users (Admin only)
router.get("/", authMiddleware, roleMiddleware(["Admin"]), async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

module.exports = router;

