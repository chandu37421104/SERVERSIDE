const express = require("express");
const Reward = require("../models/Reward");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Get all rewards
router.get("/", authMiddleware, async (req, res) => {
  const rewards = await Reward.find();
  res.json(rewards);
});

// Claim a reward
router.post("/:id/claim", authMiddleware, async (req, res) => {
  const reward = await Reward.findById(req.params.id);
  if (!reward) return res.status(404).json({ error: "Reward not found" });

  if (req.user.points < reward.pointsRequired) {
    return res.status(400).json({ error: "Not enough points" });
  }

  reward.claimedBy = req.user.id;
  reward.claimedAt = new Date();
  await reward.save();

  res.json({ message: "Reward claimed successfully", reward });
});

module.exports = router;

