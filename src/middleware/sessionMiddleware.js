
const session = require('express-session');

// ✅ Session cookies opsat korrekt til produktion
module.exports = session({
  name: 'overstory.sid',                 // Navn på cookie
  secret: process.env.SESSION_SECRET,    // Hent fra .env
  resave: false,                          // Gem kun når session ændres
  saveUninitialized: false,               // Gem ikke tomme sessioner
  cookie: {
    httpOnly: true,                       // Beskyt mod JS-adgang
    secure: true,                         // Send kun over HTTPS
    sameSite: 'lax'                       // Begræns CSRF, men tillad normale redirects
  }
});

