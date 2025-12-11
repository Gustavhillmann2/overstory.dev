// middleware/csrfMiddleware.js
const csrf = require('csurf');

const csrfProtection = csrf();
const attachCsrfToken = (req, res, next) => {
  try {
    res.locals.csrfToken = req.csrfToken();
  } catch (e) {
    // hvis token ikke er initialiseret endnu
    res.locals.csrfToken = null;
  }
  next();
};

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