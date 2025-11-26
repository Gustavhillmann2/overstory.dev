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
        phone TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL
    )`);

    console.log('Database initialized');
});

db.serialize(() => {
    console.log('Creating events table if it doesn\'t exist');
    db.run(`CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        date DATE NOT NULL,
        description TEXT NOT NULL,
        price INTEGER NOT NULL,
        imageUrl TEXT NOT NULL
    )`);

    console.log('Events table initialized');
});


module.exports = db;