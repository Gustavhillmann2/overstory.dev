const cors = require('cors'); // Importerer cors biblioteket

// Henter CORS_ORIGIN miljøvariablen, falder tilbage til standard URL.
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'https://overstory.dk';

const corsMiddleware = cors({
	origin: CORS_ORIGIN, // Tillader forespørgsler fra den definerede origin

	methods: ['GET', 'POST', 'OPTIONS'], // Tillader kun disse HTTP-metoder

	// Tillader overførsel af credentials (cookies/sessions-id). Dette er nødvendigt, da appen bruger express-session.
	credentials: true,
});

module.exports = corsMiddleware;