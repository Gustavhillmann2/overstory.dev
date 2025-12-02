require('dotenv').config();
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

async function sendEventRegistrationSms(to, event) {
	try {
		const message = await client.messages.create({
			body: `Hi! You are now signed up for "${event.title}" d. ${event.date}. See you there!`,
			from: process.env.TWILIO_PHONE,
			to: to
		});

		console.log("SMS sent:", message.sid);
	} catch (err) {
		console.error("Twilio SMS error:", err);
		throw err;
	}
}

module.exports = {
	sendEventRegistrationSms
};