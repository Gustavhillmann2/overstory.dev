const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// This route listens for POST requests at /api/events
router.post('/events', eventController.createEvent);

module.exports = router;