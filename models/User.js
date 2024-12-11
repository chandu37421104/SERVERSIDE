const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["Admin", "Faculty", "Student", "PI"], required: true },
  points: { type: Number, default: 0 },
});

module.exports = mongoose.model("User", userSchema);

