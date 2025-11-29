const express = require('express'); // Importerer Express
const router = express.Router(); // Opretter en router
const eventController = require('../controllers/eventController'); // Importerer eventController

router.get('/', eventController.renderEvents); // Rute til at hente og vise alle events
router.post('/register/:eventId', eventController.registerEvent); // Rute til at registrere en bruger til et event

module.exports = router;