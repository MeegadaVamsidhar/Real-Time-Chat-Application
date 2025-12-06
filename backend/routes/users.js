const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// All routes are protected
router.use(protect);

// @desc    Get all users (for search/contacts)
// @route   GET /api/users
// @access  Private
router.get('/', async (req, res, next) => {
    try {
        const { search } = req.query;

        let query = { _id: { $ne: req.user.id } }; // Exclude current user

        if (search) {
            query.$or = [
                { username: { $regex: search, $options: 'i' } },
                { fullName: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }

        const users = await User.find(query)
            .select('username fullName avatar email isOnline lastSeen')
            .limit(20);

        res.status(200).json({
            status: 'success',
            count: users.length,
            users
        });
    } catch (error) {
        next(error);
    }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private
router.get('/:id', async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
            .select('username fullName avatar email bio isOnline lastSeen createdAt');

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        res.status(200).json({
            status: 'success',
            user
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
