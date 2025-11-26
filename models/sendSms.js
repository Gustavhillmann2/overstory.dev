require('dotenv').config();  // Loader .env

const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;  // læser fra .env
const authToken  = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

async function sendSms(to,from,body) {
  try {
    const message = await client.messages.create({
      body: body,
      from: from,
      to: to
    });
    console.log('Message sent with SID:', message.sid);
  } catch (error) {
    console.error('Error sending SMS:', error);
  }
}
sendSms('+123','+123','Lille besked')