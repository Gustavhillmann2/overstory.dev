// middleware/sessionMiddleware.js
const session = require('express-session');

const IN_PROD = process.env.NODE_ENV === 'production';
const SESSION_SECRET = process.env.SESSION_SECRET;
if (!SESSION_SECRET) {
  console.warn('WARNING: SESSION_SECRET is not set. Set process.env.SESSION_SECRET for production.');
}

module.exports = session({
  name: process.env.SESSION_NAME || 'overstory.sid',
  secret: SESSION_SECRET || 'dev-secret-change-me', // kun fallback til dev
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    httpOnly: true,
    secure: IN_PROD,            // sikre cookies i produktion
    sameSite: IN_PROD ? 'none' : 'lax' // vurder 'strict' hvis muligt
  },
});
