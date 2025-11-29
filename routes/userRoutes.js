const express = require('express'); // Importerer Express
const router = express.Router(); // Opretter en router
const userController = require('../controllers/userController'); // Importerer userController

router.post('/create-user', userController.createUser); // Rute til at oprette en ny bruger
router.post('/login', userController.loginUser); // Rute til at logge en bruger ind
router.get('/register', (req, res) => { // Rute til at vise registreringssiden
    res.render('register');
});

module.exports = router;