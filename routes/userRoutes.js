const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// This route listens for POST requests at /api/users
router.post('/create-user', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/register', (req, res) => {
    res.render('register');
});

module.exports = router;