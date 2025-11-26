// app.js
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const rateLimit = require('express-rate-limit');
require('express-async-errors'); // patch to handle async errors automatically
const cloudinary = require('cloudinary').v2;

const { body, validationResult } = require('express-validator');

const app = express();

// --- 1. SECURITY & PERFORMANCE MIDDLEWARES ---
// Helmet: adds security headers
app.use(helmet());

// CORS: enable cross-origin requests (adjust origin as needed)
app.use(cors({
  origin: 'http://overstory.dev', // allow requests only from this origin
  credentials: true, // allow cookies
}));

// Morgan: HTTP request logger
app.use(morgan('dev'));

// --- 2. PARSERS ---
app.use(express.json()); // parse JSON bodies
app.use(express.urlencoded({ extended: true })); // parse URL-encoded bodies
app.use(cookieParser()); // parse cookies

// --- 3. SESSION MANAGEMENT ---
app.use(session({
  secret: 'mySecretKey', // change to a strong secret
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true, // prevent client-side JS access
    secure: false,  // set true if using HTTPS
    maxAge: 1000 * 60 * 60 // 1 hour
  }
}));

// --- 4. RATE LIMITING ---
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// --- 5. ROUTES WITH VALIDATION ---
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

// --- 6. GLOBAL ERROR HANDLER ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// --- 7. START SERVER ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// --- 8. CLOUDINARY CONFIGURATION ---
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = cloudinary;