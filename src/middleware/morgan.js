const morgan = require('morgan'); // Importere morgan modulet

const logger = process.env.NODE_ENV === 'production' 
    ? morgan('combined') // Bruger 'combined' format for produktion
    : morgan('dev'); // Bruger 'dev' format for udvikling

module.exports = logger;