const express = require('express'); // Importerer Express
const router = express.Router(); // Opretter en router
const userController = require('../controllers/userController'); // Importerer userController
const { loginLimiter } = require('../middleware/rateLimiter'); // Importerer login rate limiter middleware

router.post('/create-user', userController.createUser); // Rute til at oprette en ny bruger
router.post('/login', loginLimiter, userController.loginUser); // Rute til at logge en bruger ind
router.get('/register', (req, res) => { // Rute til at vise registreringssiden
    res.render('register');
});
router.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('overstory.sid');
        res.redirect('/');
    });
});

module.exports = router;