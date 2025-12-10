require('dotenv').config();
const express = require("express");
const path = require("path");
const cors = require('cors');
const helmet = require('helmet');
const { limiter } = require('./middleware/rateLimiter');
const sessionMiddleware = require('./middleware/sessionMiddleware');
const responseTimeMiddleware = require('./middleware/responseTime');
const { csrfProtection, attachCsrfToken, csrfErrorHandler } = require('./middleware/csrfMiddleware');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const loggerMiddleware = require('./middleware/morgan');

const app = express();

// Hvis app kører bag en reverse proxy (Heroku, nginx, PM2 cluster), sæt trust proxy
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

app.use(loggerMiddleware); // Benytter logger middleware

// CORS: vær præcis. Hvis du skal bruge credentials, skal origin være en streng eller en whitelist-funktion.
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'https://overstory.dk',
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
}));

// Helmet - anbefales konfigureret 
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'"],
      styleSrc: ["'self'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "https://res.cloudinary.com"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
}));

// Body parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session - skal være før CSRF (csurf bruger session/cookies)
app.use(sessionMiddleware);

// CSRF protection (skal komme efter body-parser & session)
app.use(csrfProtection);

// Gør token tilgængelig i views
app.use(attachCsrfToken);

// CSRF error handler (middleware med 4 parametre)
app.use(csrfErrorHandler);

// Rate limiter + response time
app.use(limiter);
app.use(responseTimeMiddleware);

// Static files
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/user', userRoutes);
app.use('/events', eventRoutes);

// Root
app.get("/", (req, res) => {
  res.render('login');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));