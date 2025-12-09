const express = require("express");
const path = require("path");
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const csrf = require('csurf');
const { limiter } = require('./middleware/rateLimiter');
const sessionMiddleware = require('./middleware/sessionMiddleware');
const responsTimeMiddleware = require ('./middleware/responseTime');

const app = express();

// Morgan logger alle HTTP requests til konsollen
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

// CORS begrænser hvilke domæner der kan tilgå applikationen
app.use(cors({
  origin: ['https://overstory.dk'], // Tillad kun anmodninger fra denne oprindelse
  methods: ['GET', 'POST'], // Tillad kun disse HTTP metoder
  credentials: true // Tillad cookies og autorisations headers
}));

// endpoint beskyttelse med helmet middleware (Sætter sikre HTTP headers)
app.use(helmet());

// Håndterer form data og JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sætter view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));  

app.use(sessionMiddleware); // Anvender session middleware
app.use(csrfProtection); // Anvender CSRF beskyttelse middleware
const csrfProtection = csrf(); // Initialiserer CSRF beskyttelse middleware

// gør CSRF token tilgængelig i alle views
app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
});

// Håndterer CSRF fejl
app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
      return res.status(403).send('Form tampered with.');
  }
  next(err);
});

app.use(limiter); // Anvender rate limiter middleware
app.use(responsTimeMiddleware); // Avender response time middleware

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