const express = require("express");
const path = require("path");
const helmet = require('helmet');

//Middleware imports
const { limiter } = require('./middleware/rateLimiter');
const responsTimeMiddleware = require ('./middleware/responseTime');
const sessionMiddleware = require('./middleware/sessionMiddleware');
const { csrfProtection, attachCsrfToken, csrfErrorHandler } = require('./middleware/csrfMiddleware');

// Importer ruter
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');

const app = express();

// Håndterer form data og JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sætter view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(sessionMiddleware); // Anvender session middleware
app.use(limiter); // Anvender rate limiter middleware
app.use(responsTimeMiddleware); // Avender response time middleware
app.use(helmet());

app.use(csrfProtection);
app.use(attachCsrfToken);
app.use(csrfErrorHandler);

// Serverer statiske filer (css, osv)
app.use(express.static(path.join(__dirname, 'public')));

// Tilføjer ruter til appen
app.use('/user', userRoutes);
app.use('/events', eventRoutes);

// Definerer ruten
app.get("/", (req, res) => {
  res.render('login');
});

// Starter serveren
app.listen(3000, () => console.log("Server running on port 3000"));