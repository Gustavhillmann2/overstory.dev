const helmet = require('helmet'); // Importerer helmet middleware for sikkerhedsheaders

// Konfigurerer helmet middleware med Content Security Policy (CSP) direktiver
const helmetMiddleware = helmet({
    contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
          connectSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
          fontSrc: ["'self'", "https://fonts.gstatic.com"],
          imgSrc: ["'self'", "https://res.cloudinary.com"],
          objectSrc: ["'none'"],
          upgradeInsecureRequests: [],
        },
    }
});

module.exports = helmetMiddleware;