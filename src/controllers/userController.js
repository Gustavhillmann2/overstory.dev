const UserModel = require('../models/userModel'); // Importer UserModel
const bcrypt = require('bcrypt');

// Controller funktion til at oprette en bruger
async function createUser(req, res) {
	const { username, phone, email, password } = req.body; // Henter brugerens oplysninger

	// Validering af input
	if(!username || !phone || !email || !password) {
		return res.status(400).json({ error: 'Missing fields' }); // Returner fejl hvis felter mangler
	}

	try {
		const hashedPassword = await bcrypt.hash(password, 10); // Hash adgangskoden
		const newUser = await UserModel.createUser(username, phone, email, hashedPassword); // Opretter brugeren i databasen

		return res.render('login'); // Rendrer login siden efter succesfuld oprettelse
	} catch (err) {
		return res.status(500).json({ error: 'Database error' });
	};
};

// Controller funktion til at logge en bruger ind
async function loginUser(req, res) {
	const { username, password } = req.body; // Henter brugerens oplysninger

	try {
		const user = await UserModel.findUser(username); // Finder brugeren i databasen

		if (!user || !(await bcrypt.compare(password, user.password))) { // Tjekker om brugeren findes og om adgangskoden matcher
            return res.render('login', { error: 'Wrong password or username' }); // Returner fejl ved forkert brugernavn eller adgangskode
		};

		// Gemmer brugerens oplysninger i sessionen
		req.session.user = {
			id: user.id,
			username: user.username,
			email: user.email,
			phone: user.phone
		};

		return res.redirect('/events'); // Redirecter til events-siden efter succesfuld login

	} catch (err) {
        return res.render('login', { error: 'Database error' });
	};
};

module.exports = {
	createUser,
	loginUser
};