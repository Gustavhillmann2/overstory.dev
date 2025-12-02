// app.js
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const rateLimit = require('express-rate-limit');
require('express-async-errors'); // patch to handle async errors automatically

const { body, validationResult } = require('express-validator');

const app = express();

// 1. SECURITY & PERFORMANCE MIDDLEWARES
// Helmet: adds security headers
app.use(helmet());

// CORS: enable cross-origin requests (adjust origin as needed)
app.use(cors({
  origin: 'http://overstory.dev', // allow requests only from this origin
  credentials: true, // allow cookies
}));

// Morgan: HTTP request logger
app.use(morgan('dev'));

// 2. COOKIE PARSERS 
app.use(express.json()); // parse JSON bodies
app.use(express.urlencoded({ extended: true })); // parse URL-encoded bodies
app.use(cookieParser()); // parse cookies

// 5. ROUTES WITH VALIDATION
app.post('/register',
  // express-validator: validate input
  body('email').isEmail().withMessage('Must be a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.json({ message: 'User registered successfully!' });
  }
);

// 6. GLOBAL ERROR HANDLER 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 7. CLOUDINARY CONFIGURATION 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
// Log the configuration
console.log(cloudinary.config());

module.exports = cloudinary;