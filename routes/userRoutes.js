const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { getProfile, updateProfile } = require('../controllers/userController');
const { check, validationResult } = require('express-validator');

// GET /api/users/profile: Retrieve the logged-in user's profile
router.get('/profile', protect, getProfile);

// PUT /api/users/profile: Update the logged-in user's profile
router.put(
  '/profile',
  protect,
  [
    check('email', 'Please include a valid email').isEmail(),
    check('username', 'Username is required').not().isEmpty()
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  updateProfile
);

module.exports = router;
