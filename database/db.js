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
                },
                {
                    title: 'Sustainable Gardening Seminar',
                    date: '2024-09-10',
                    description: 'Discover techniques for creating a sustainable and eco-friendly garden at home.',
                    price: 15,
                    imageUrl: ''
                },
                {
                    title: 'Bird Watching Expedition',
                    date: '2024-10-05',
                    description: 'Explore local bird habitats and learn to identify different species with an expert guide.',
                    price: 25,
                    imageUrl: ''
                },
                {
                    title: 'Composting 101',
                    date: '2024-11-20',
                    description: 'Learn the basics of composting and how to reduce waste in your household.',
                    price: 5,
                    imageUrl: ''
                },
                {
                    title: 'Urban Forestry Tour',
                    date: '2024-12-15',
                    description: 'Take a tour of the city\'s urban forests and learn about their importance to the environment.',
                    price: 30,
                    imageUrl: ''
                },
                {
                    title: 'Wildlife Photography Workshop',
                    date: '2025-01-10',
                    description: 'Improve your photography skills while capturing images of local wildlife.',
                    price: 40,
                    imageUrl: ''
                },
                {
                    title: 'Eco-Friendly Crafts',
                    date: '2025-02-25',
                    description: 'Create beautiful crafts using recycled and sustainable materials.',
                    price: 12,
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