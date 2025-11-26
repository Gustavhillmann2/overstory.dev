const express = require("express");
const path = require("path");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const userRoutes = require('./routes/userRoutes');

app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/events", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "event.html"));
});

app.listen(3000, () => console.log("Server running on port 3000"));