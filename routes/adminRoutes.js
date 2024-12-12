const express = require('express');
const {
    getAllLeaderboards,
    createRole,
    updateRole,
    deleteRole,
} = require('../controllers/adminController');

const router = express.Router();

// Routes for Admin Management
router.get('/leaderboards', getAllLeaderboards); // View All Leaderboards
router.post('/roles', createRole);              // Create a Role
router.put('/roles/:id', updateRole);           // Update a Role
router.delete('/roles/:id', deleteRole);        // Delete a Role

module.exports = router;
