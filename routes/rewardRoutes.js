const express = require('express');
const {
    addReward,
    getRewards,
    getReward,
    updateReward,
    deleteReward,
    getUserRewards
} = require('../controllers/rewardController');

const router = express.Router();

// Routes for Reward Management
router.post('/', addReward); // Add a New Reward
router.get('/', getRewards); // Retrieve All Rewards
router.get('/:id', getReward); // Retrieve Details of a Specific Reward
router.put('/:id', updateReward); // Update a Reward
router.delete('/:id', deleteReward); // Delete a Reward
router.get('/user/:userId', getUserRewards); // Retrieve All Rewards of a Specific User

module.exports = router;



