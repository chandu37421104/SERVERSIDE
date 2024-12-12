const User = require('../models/User');
const Task = require('../models/Task');
const Reward = require('../models/Reward');
const Role = require('../models/Role'); // Role model (if you manage roles separately)

// View All Leaderboards
exports.getAllLeaderboards = async (req, res) => {
    try {
        const roles = ['student', 'faculty', 'graduate', 'admin'];

        const leaderboards = await Promise.all(
            roles.map(async (role) => {
                const leaderboard = await User.aggregate([
                    { $match: { role } },
                    {
                        $lookup: {
                            from: 'tasks',
                            localField: '_id',
                            foreignField: 'assignedTo',
                            as: 'tasks',
                        },
                    },
                    {
                        $lookup: {
                            from: 'rewards',
                            localField: '_id',
                            foreignField: 'assignedTo',
                            as: 'rewards',
                        },
                    },
                    {
                        $project: {
                            name: 1,
                            email: 1,
                            totalPoints: {
                                $add: [
                                    { $sum: '$tasks.points' },
                                    { $sum: '$rewards.pointsRequired' },
                                ],
                            },
                        },
                    },
                    { $sort: { totalPoints: -1 } },
                ]);
                return { role, leaderboard };
            })
        );

        res.status(200).json(leaderboards);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a Role
exports.createRole = async (req, res) => {
    try {
        const { name, permissions } = req.body;

        const role = new Role({ name, permissions });
        await role.save();

        res.status(201).json(role);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a Role
exports.updateRole = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const role = await Role.findByIdAndUpdate(id, updatedData, { new: true });
        if (!role) return res.status(404).json({ error: 'Role not found' });

        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a Role
exports.deleteRole = async (req, res) => {
    try {
        const { id } = req.params;

        const role = await Role.findByIdAndDelete(id);
        if (!role) return res.status(404).json({ error: 'Role not found' });

        res.status(200).json({ message: 'Role deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
