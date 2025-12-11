const morgan = require('morgan'); // Importere morgan modulet

let logger; // Opretter variabel til logger

if (process.env.NODE_ENV === 'production') { // Tjekker om miljøet er produktion
    logger = morgan('combined'); // Bruger 'combined' format for produktion
} else {
    logger = morgan('dev'); // Bruger 'dev' format for udvikling
};

module.exports = logger;