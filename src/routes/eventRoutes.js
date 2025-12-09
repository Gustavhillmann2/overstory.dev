const express = require('express'); // Importerer Express
const router = express.Router(); // Opretter en router
const eventController = require('../controllers/eventController'); // Importerer eventController
const requireAuth = require('../middleware/authMiddleware'); // begrænser at man skal være logget ind for se events

router.get('/', requireAuth, eventController.renderEvents);
router.post('/register/:eventId', requireAuth, eventController.registerEvent);

module.exports = router;