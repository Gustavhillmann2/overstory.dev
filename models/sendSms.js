// Import Twilio
const twilio = require('twilio');
const dotenv = require('dotenv').config();


// Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

// Create Twilio client
const client = twilio(accountSid, authToken);

// Function to send SMS
async function sendSms() {
    try {
        const message = await client.messages.create({
            body: 'messageBody',      // Din besked her
            from: '+19786072987',     // Dit Twilio-nummer
            to: '+4529878824'         // Modtagerens nummer
        });
        console.log('Message sent with SID:', message.sid);
    } catch (error) {
        console.error('Error sending SMS:', error);
    }
}

// Example usage
sendSms();
