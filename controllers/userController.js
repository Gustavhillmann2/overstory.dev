/* Dens formål er, at tale med Express */

// Importere models
const UserModel = require('../models/userModel');

// Controller funktion til at oprette en bruger
async function createUser(req, res) {
	console.log("REQ BODY:", req.body);
	const { username, phone, email, password } = req.body;

	// Validering af input
	if(!username || !phone || !email || !password) {
		return res.status(400).json({ error: 'Missing fields' });
	}

	try {
		const newUser = await UserModel.createUser(username, phone, email, password);

		return res.status(201).json(newUser);
	} catch (err) {
		return res.status(500).json({ error: 'Database error' });
	}
}

module.exports = {
	createUser,
};