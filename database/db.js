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
    console.log('Creating database if it doesn\'t exist');
    db.run(`CREATE TABLE IF NOT EXISTS registrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        eventId INTEGER NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(userId, eventId),
        FOREIGN KEY (userId) REFERENCES users(id),
        FOREIGN KEY (eventId) REFERENCES events(id)
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

    db.get(`SELECT COUNT(*) AS count FROM events`, (err, row) => {
        if (err) {
            console.error('Error counting events:', err);
            return;
        }

        if (row.count === 0) {
            console.log("Inserting default events...");

            const events = [
                {
                    title: 'Tree Planting Workshop',
                    date: '2024-07-15',
                    description: 'Learn how to plant and care for trees in this hands-on workshop.',
                    price: 20,
                    imageUrl: ''
                },
                {
                    title: 'Nature Walk',
                    date: '2024-08-01',
                    description: 'Join us for a guided walk through the local forest and learn about native plants and wildlife.',
                    price: 10,
                    imageUrl: ''
                }
            ];

            const stmt = db.prepare(`
                INSERT INTO events (title, date, description, price, imageUrl)
                VALUES (?, ?, ?, ?, ?)
            `);

            events.forEach(event => {
                stmt.run(event.title, event.date, event.description, event.price, event.imageUrl);
            });

            stmt.finalize(() => {
                console.log("Default events inserted successfully.");
            });
        } else {
            console.log(`Events already exist: ${row.count}`);
        }
    });
});


module.exports = db;