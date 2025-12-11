const session = require('express-session'); // Importerer express-session modulet

const IN_PROD = process.env.NODE_ENV === 'production'; // Tjekker om miljøet er produktion

const SESSION_SECRET = process.env.SESSION_SECRET; // Henter session hemmelighed fra miljøvariabler

// Advarer hvis SESSION_SECRET ikke er sat i produktion
if (!SESSION_SECRET) {
	console.warn('WARNING: SESSION_SECRET is not set. Set process.env.SESSION_SECRET for production.');
};

module.exports = session({
	name: process.env.SESSION_NAME || 'overstory.sid', // Brugerdefineret session cookie navn
	secret: SESSION_SECRET || 'dev-secret-change-me', // kun fallback til dev
	resave: false, // undgå at gemme session hvis ikke ændret
	saveUninitialized: false, // undgå at gemme uinitialiserede sessioner
	cookie: { 
		maxAge: 1000 * 60 * 60 * 24, // 1 day
		httpOnly: true,
		secure: IN_PROD, // sikre cookies i produktion
		sameSite: 'lax' // vurder 'strict' hvis muligt
	},
});
