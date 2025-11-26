const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// This route listens for POST requests at /api/users
router.post('/users', userController.createUser);

module.exports = router;