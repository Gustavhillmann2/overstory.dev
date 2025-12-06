const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // definere hvor længe en rate-limit periode varer
    max: 100, // limiter hver IP to 100 requests pr. windowMs
    message: 'Too many requests from this IP, please try again later.',
    statusCode: 429, // HTTP status kode for "Too Many Requests"
})

module.exports = limiter; // eksportere rate-limiter middleware