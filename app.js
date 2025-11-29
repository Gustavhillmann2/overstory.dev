const express = require("express");
const path = require("path");
const app = express();
const session = require('express-session');

app.use(
	session({
		secret: "overstoryKey107",
		resave: false,
		saveUninitialized: false,
		cookie: {
		  maxAge: 1000 * 60 * 60 * 24, // 1 day
		  httpOnly: true,
		},
	})
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

const userRoutes = require('./routes/userRoutes');

app.use(userRoutes);

app.get("/", (req, res) => {
  res.render('login');
});

app.get("/events", (req, res) => {
  res.render('event');
});

app.listen(3000, () => console.log("Server running on port 3000"));