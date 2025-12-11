const csrf = require('csurf'); // CSRF beskyttelse middleware

const csrfProtection = csrf(); // Initialiserer CSRF beskyttelse middleware

// Middleware til at vedhæfte CSRF token til response locals
const attachCsrfToken = (req, res, next) => {
  try {
    res.locals.csrfToken = req.csrfToken(); // Henter CSRF token og vedhæfter det til response locals
  } catch (e) {
    res.locals.csrfToken = null; // Hvis der opstår en fejl, sæt token til null
  }
  next();
};

// Middleware til at håndtere CSRF fejl
const csrfErrorHandler = (err, req, res, next) => {
  if (err && err.code === 'EBADCSRFTOKEN') { // Tjekker om fejlen er en CSRF fejl
    return res.status(403).send('Form tampered with.'); // Sender 403 respons kode
  }
  next(err);
};

module.exports = {
  csrfProtection,
  attachCsrfToken,
  csrfErrorHandler
};