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

		return res.render('login');
	} catch (err) {
		return res.status(500).json({ error: 'Database error' });
	}
}

async function loginUser(req, res) {
	const { username, password } = req.body; // Henter brugerens oplysninger

	try {
		const user = await UserModel.findUser(username); // Finder brugeren i databasen

		if (!user || user.password !== password) { // Tjekker om brugeren findes og om adgangskoden matcher
            return res.render('login', { error: 'Wrong password or username' });
		};

		req.session.userId = {
			id: user.id,
			username: user.username,
			email: user.email,
		};

		console.log('Session data:', req.session.userId);
		console.log('Successful login for user:', username);

		return res.redirect('/events'); // Redirecter til events-siden efter succesfuld login

	} catch (err) {
        return res.render('/login', { error: 'Database error' });
	}
}

module.exports = {
	createUser,
	loginUser
};