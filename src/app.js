require('dotenv').config();
const express = require("express");
const path = require("path");

// Importere middleware 
const sessionMiddleware = require('./middleware/sessionMiddleware');
const responseTimeMiddleware = require('./middleware/responseTime');
const loggerMiddleware = require('./middleware/morgan');
const corsMiddleware = require('./middleware/cors');
const helmetMiddleware = require('./middleware/helmetMiddleware');
const { limiter } = require('./middleware/rateLimiter');
const { csrfProtection, attachCsrfToken, csrfErrorHandler } = require('./middleware/csrfMiddleware');

// Importere ruter
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');

const app = express(); // Starter express app

// 🔹 Dette skal stå FØR session middleware
// Tillader Express at se HTTPS, når serveren kører bag en proxy
app.set('trust proxy', 1);

// Sætter view engine, lokation på views og public folder
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(loggerMiddleware); // Benytter logger middleware
app.use(corsMiddleware); // Benytter CORS middleware
app.use(helmetMiddleware); // Benytter Helmet middleware
app.use(limiter); // Benytter rate limiter middleware
app.use(responseTimeMiddleware); // Benytter response time middleware

// Data middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 🔹 Tjekker for secure cookies (valgfrit)
app.use((req, res, next) => {
  console.log('req.secure:', req.secure, 'X-Forwarded-Proto:', req.get('X-Forwarded-Proto'));
  next();
});

// 🔹 Session middleware (Secure cookies vil nu virke)
app.use(sessionMiddleware);

// 🔹 CSRF middleware 
app.use(csrfProtection);
app.use(attachCsrfToken);
app.use(csrfErrorHandler);

// Ruter
app.use('/user', userRoutes);
app.use('/events', eventRoutes);

// Root
app.get("/", (req, res) => {
  res.render('login');
});

// 🔹 Start server (Node.js på serveren håndterer HTTPS)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
