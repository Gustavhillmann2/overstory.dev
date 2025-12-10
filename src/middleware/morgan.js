const morgan = require('morgan'); // Importere morgan modulet

let logger; // Opretter variabel til logger

if (process.env.NODE_ENV === 'production') {
    logger = morgan('combined');
} else {
    logger = morgan('dev');
}

module.exports = logger;