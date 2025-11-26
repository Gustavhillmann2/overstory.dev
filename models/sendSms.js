require('dotenv').config();  // Loader .env

const twilio = require('twilio');

// Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

async function sendSms() {
  try {
    const message = await client.messages.create({
      body: 'Du kan vinde millioner',
      from: '+19786072987',
      to: '+4529878824'
    });
    console.log('Message sent with SID:', message.sid);
  } catch (error) {
    console.error('Error sending SMS:', error);
  }
}

sendSms();