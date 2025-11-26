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

module.exports = {
	createEvent,
};