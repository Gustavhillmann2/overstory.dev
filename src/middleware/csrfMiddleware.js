const csrf = require('csurf');

// 🔹 CSRF protection
const csrfProtection = csrf();

// 🔹 Middleware der tilføjer CSRF token til templates
const attachCsrfToken = (req, res, next) => {
  try {
    res.locals.csrfToken = req.csrfToken();
  } catch (e) {
    res.locals.csrfToken = null;
  }
  next();
};

// 🔹 Fejl-håndtering for CSRF
const csrfErrorHandler = (err, req, res, next) => {
  if (err && err.code === 'EBADCSRFTOKEN') {
    return res.status(403).send('Form tampered with.');
  }
  next(err);
};

module.exports = {
  csrfProtection,
  attachCsrfToken,
  csrfErrorHandler
};
