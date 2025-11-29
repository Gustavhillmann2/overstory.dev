const EventModel = require('../models/eventModel'); // Importer EventModel

// Controller funktion til at oprette et event
async function createEvent(req, res) {
	// console.log("REQ BODY:", req.body); 
	const { title, date, description, price, imageUrl } = req.body; // Hent data fra request body

	// Validering af input
	if (!title || !date || !description || !price || !imageUrl) {
		return res.status(400).json({ error: 'Missing fields' });
	}

	try {
		const newEvent = await EventModel.createEvent(title, date, description, price, imageUrl); // Opret event i databasen

		return res.status(201).json(newEvent);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: 'Database error' });
	}
}

// Controller funktion til at rendre events siden
async function renderEvents(req, res) {
	try {
		
		const user = req.session.userId; // Hent bruger info fra session

		const events = await EventModel.getEvents(user.id); // Hent events fra databasen
		
		// console.log(user);

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
	}
}

// Controller funktion til at registrere en bruger til et event
async function registerEvent(req, res) {
	const userId = req.session.userId.id; // Hent bruger ID fra session
	const eventId = req.params.eventId; // Hent event ID fra URL parametre

	try {
		await EventModel.registerEvent(userId, eventId); // Registrer bruger til event i databasen
		return res.redirect('/events'); // Redirect til events siden
	} catch (err) {
		console.error(err);

		if (err.message.includes("UNIQUE")) {
			return res.redirect('/events');
		}

		return res.status(500).json({ error: 'Database error' });
	}
}

module.exports = {
	createEvent,
	renderEvents,
	registerEvent
};