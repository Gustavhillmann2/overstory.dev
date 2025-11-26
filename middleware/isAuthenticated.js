/* OBS her et udkast til hvordan vores middleware kan se ud med at tjekke 
om man er logget ind (taget fra aktieporteføljekoden) - fjern kommentering
// Function til at tjekke om brugeren er logget ind
export function isAuthenticated(req, res, next) {
    if (!req.session || !req.session.user) {
        return res.redirect('/login');
    }
    next(); // Giv kontrollen videre til næste funktion (fx controlleren)
} */