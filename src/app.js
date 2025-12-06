const express = require("express");
const path = require("path");
const { limiter } = require('./middleware/rateLimiter');
const sessionMiddleware = require('./middleware/sessionMiddleware');
const responsTimeMiddleware = require ('./middleware/responseTime');

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

// Serverer statiske filer (css, osv)
app.use(express.static(path.join(__dirname, 'public')));

// Importer ruter
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');

// Tilføjer ruter til appen
app.use('/user', userRoutes);
app.use('/events', eventRoutes);

// Definerer ruten
app.get("/", (req, res) => {
  res.render('login');
});

// Starter serveren
app.listen(3000, () => console.log("Server running on port 3000"));