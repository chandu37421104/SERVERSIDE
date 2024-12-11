const mongoose = require("mongoose");

const rewardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  pointsRequired: { type: Number, required: true },
  claimedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  claimedAt: { type: Date },
});

module.exports = mongoose.model("Reward", rewardSchema);


