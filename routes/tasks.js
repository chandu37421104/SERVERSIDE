const express = require("express");
const Task = require("../models/Task");
const authMiddleware = require("../middleware/auth");
const roleMiddleware = require("../middleware/role");

const router = express.Router();

// Create a new task (Admin or PI only)
router.post("/", authMiddleware, roleMiddleware(["Admin", "PI"]), async (req, res) => {
  const { title, description, assignedTo, points } = req.body;
  const task = new Task({ title, description, assignedTo, points });
  await task.save();
  res.status(201).json(task);
});

// Get tasks for a user
router.get("/", authMiddleware, async (req, res) => {
  const tasks = await Task.find({ assignedTo: req.user.id });
  res.json(tasks);
});

module.exports = router;
