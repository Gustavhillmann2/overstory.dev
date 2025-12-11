// Sikrer at brugerene er logget ind når de prøver at bruge endpoints
module.exports = function requireAuth(req, res, next) {
    if (!req.session.user) { // Tjekker om bruger er logget ind
        return res.redirect('/'); // Redirecter til login siden hvis ikke logget ind
    }
    next(); // Fortsætter til næste middleware eller route handler hvis logget ind
};