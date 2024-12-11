import Task from '../models/Task.js';
import User from '../models/User.js';

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ role: req.user.role });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const completeTask = async (req, res) => {
  const { taskId } = req.body;

  try {
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    task.status = 'completed';
    await task.save();

    await User.findByIdAndUpdate(req.user.id, { $inc: { points: task.points } });
    res.status(200).json({ message: 'Task marked as completed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
