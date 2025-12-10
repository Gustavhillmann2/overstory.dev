const helmet = require('helmet');

const helmetMiddleware = helmet({
    contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"], // Kommentar
          scriptSrc: ["'self'"], // Kommentar
          connectSrc: ["'self'"],
          styleSrc: ["'self'", "https://fonts.googleapis.com"],
          fontSrc: ["'self'", "https://fonts.gstatic.com"],
          imgSrc: ["'self'", "https://res.cloudinary.com"],
          objectSrc: ["'none'"],
          upgradeInsecureRequests: [],
        },
    }
});

module.exports = helmetMiddleware;