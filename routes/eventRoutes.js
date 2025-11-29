const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.get('/', eventController.renderEvents);
router.post('/register/:eventId', eventController.registerEvent);

module.exports = router;