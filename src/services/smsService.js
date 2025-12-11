require('dotenv').config(); // Henter variabler fra .env
const twilio = require('twilio'); // Importerer Twilio biblioteket

const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID; // Henter twilio konto SID fra .env
const AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN; // Henter twilio auth token fra .env

const client = twilio(ACCOUNT_SID, AUTH_TOKEN); // Opretter Twilio klienten

// Funktion til at sende SMS ved event registrering
async function sendEventRegistrationSms(to, event) {
	try {
		// Sender SMS via Twilio klienten
		const message = await client.messages.create({
			body: `Hi! You are now signed up for "${event.title}" d. ${event.date}. See you there!`,
			from: process.env.TWILIO_PHONE,
			to: to
		});

		console.log("SMS sent:", message.sid); // Log besked SID ved succes
	} catch (err) {
		console.error("Twilio SMS error:", err); // Log fejl til konsollen
		throw err; // Kaster fejlen så den kan håndteres i controlleren
	};
};

module.exports = { sendEventRegistrationSms }; // Eksporterer funktionen til brug i controlleren