const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(path.join(__dirname, 'mydb.sqlite'), (err) => {
    if (err) {
        console.error("Failed to connect to SQLite:", err);
    } else {
        console.log("Connected to SQLite at", path.join(__dirname, 'mydb.sqlite'));
    }
});

/* Opret tabel hvis den ikke findes */
db.serialize(() => {
    console.log('Creating database if it doesn\'t exist');
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL
    )`);

    console.log('Database initialized');
});

module.exports = db;