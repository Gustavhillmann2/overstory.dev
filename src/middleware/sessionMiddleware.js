const session = require ('express-session');

module.exports = session({
    secret: "overstoryKey107",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        httpOnly: true,
    },
})