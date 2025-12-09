const csrf = require('csurf');

// Middleware der aktiverer CSRF-beskyttelse
const csrfProtection = csrf();

// Gør csrf token tilgængelig i alle EJS-views
const attachCsrfToken = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};

// Håndtere fejl hvis csfr token mangler eller er ugyldigt
const csrfErrorHandler = (err, req, res, next) => {
    if (err.code === 'EBADCSRFTOKEN') {
        return res.status(403).send('Form tampered with.');
    }
    next(err);
};

module.exports = {
    csrfProtection,
    attachCsrfToken,
    csrfErrorHandler
};
