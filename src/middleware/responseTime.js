const responseTime = require ('response-time'); // Importerer response-time modulet

// Definerer middleware til at logge responstiderne via modulet
const responseTimeMiddleware = responseTime((req, res, time) => {
    console.log(`Response time for ${req.method} ${req.url} took ${time}ms`); // Logger metodenm, url og responstiden
});

module.exports = responseTimeMiddleware; // Eksporterer funktionen