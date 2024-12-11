const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Get leaderboard
router.get("/", async (req, res) => {
  const leaderboard = await User.find().sort({ points: -1 }).select("name role points");
  res.json(leaderboard);
});

module.exports = router;
