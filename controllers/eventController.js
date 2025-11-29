/* Controller til Event - taler med Express */

const EventModel = require('../models/eventModel');

// Controller funktion til at oprette et event
async function createEvent(req, res) {
	console.log("REQ BODY:", req.body);
	const { title, date, description, price, imageUrl } = req.body;

	// Validering af input
	if (!title || !date || !description || !price || !imageUrl) {
		return res.status(400).json({ error: 'Missing fields' });
	}

	try {
		const newEvent = await EventModel.createEvent(title, date, description, price, imageUrl);

		return res.status(201).json(newEvent);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: 'Database error' });
	}
}

async function renderEvents(req, res) {
	try {
		
		const user = req.session.userId;

		const events = await EventModel.getEvents(user.id);
		
		console.log(user);

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

async function registerEvent(req, res) {
	const userId = req.session.userId.id;   // FIXED
	const eventId = req.params.eventId;

	try {
		await EventModel.registerEvent(userId, eventId);
		return res.redirect('/events');
	} catch (err) {
		console.error(err);

		// If user already registered
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