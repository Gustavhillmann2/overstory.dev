module.exports = function requireAuth(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/');
    }
    next();
}; // Sikrer at brugerene er logget ind når de prøver at bruge endpoints