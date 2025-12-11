const EventModel = require('../models/eventModel'); // Importer EventModel
const { sendEventRegistrationSms } = require('../services/smsService');

// Controller funktion til at oprette et event
async function createEvent(req, res) {
	const { title, date, description, price, imageUrl } = req.body; // Hent data fra request body

	// Validering af input
	if (!title || !date || !description || !price || !imageUrl) {
		return res.status(400).json({ error: 'Missing fields' }); // Returner fejl hvis felter mangler
	}

	try {
		const newEvent = await EventModel.createEvent(title, date, description, price, imageUrl); // Opret event i databasen

		return res.status(201).json(newEvent); // Returner det oprettede event
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: 'Database error' }); // Returner fejl ved databasefejl
	};
};

// Controller funktion til at rendre events siden
async function renderEvents(req, res) {
	try {
		
		const user = req.session.user; // Hent bruger info fra session

		const events = await EventModel.getEvents(user.id); // Hent events fra databasen
		
		// Render events siden med bruger og event data
		res.render('events', { 
			events,
			id: user.id,
			username: user.username,
			email: user.email
		});
	} catch (err) {
		console.error(err);
		res.status(500).send('Database error');
	};
};

// Controller funktion til at registrere en bruger til et event
async function registerEvent(req, res) {
	const user = req.session.user; // Hent bruger info fra session
	const eventId = req.params.eventId; // Hent event ID fra URL parametre

	try {
		await EventModel.registerEvent(user.id, eventId); // Registrer bruger til event i databasen

		const event = await EventModel.getEventById(eventId); // Hent event detaljer fra databasen med en funktion oprettet i modellen

		await sendEventRegistrationSms(user.phone, event); // Benytter hjælper funktion til at sende sms til brugeren

		console.log("SMS sendt til:", user.phone); // Console log for at bekræfte sms er sendt

		return res.redirect('/events'); // Redirect til events siden
	} catch (err) {
		console.error(err); // Log fejl til konsollen

		if (err.message.includes("UNIQUE")) { // Tjek for unik fejl (brugeren er allerede registreret)
			return res.redirect('/events'); // Redirect til events siden uden fejlmeddelelse
		}

		return res.status(500).json({ error: 'Database error' }); // Returner fejl ved databasefejl
	};
};

module.exports = {
	createEvent,
	renderEvents,
	registerEvent
};