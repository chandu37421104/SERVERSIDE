const Points = require('../models/Points');
const User = require('../models/User');

exports.addPoints = async (req, res) => {
    const { userId, action, points } = req.body;
    try {
        const newPoints = await Points.create({ userId, action, points });

        // Update user's total points
        await User.findByIdAndUpdate(userId, { $inc: { points: points } });

        res.status(201).json(newPoints);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getPoints = async (req, res) => {
    try {
        const points = await Points.find({ userId: req.params.userId });
        res.status(200).json(points);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
