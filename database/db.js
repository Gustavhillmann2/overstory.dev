const path = require('path'); // Benytter path til håndtering af filstier
const sqlite3 = require('sqlite3').verbose(); // Importer sqlite3 biblioteket

// Opretter en forbindelse til SQLite databasefilen
const db = new sqlite3.Database(path.join(__dirname, 'mydb.sqlite'), (err) => {
    if (err) {
        console.error("Failed to connect to SQLite:", err);
    } else {
        console.log("Connected to SQLite at", path.join(__dirname, 'mydb.sqlite'));
    }
});

// Opretter users tabellen hvis den ikke allerede eksisterer
db.serialize(() => {
    console.log('Creating users table if it doesn\'t exist');
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL
    )`);

    console.log('Users table created');
});

// Opretter registrations tabellen hvis den ikke allerede eksisterer
db.serialize(() => {
    console.log('Creating registrations table if it doesn\'t exist');
    db.run(`CREATE TABLE IF NOT EXISTS registrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        eventId INTEGER NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(userId, eventId),
        FOREIGN KEY (userId) REFERENCES users(id),
        FOREIGN KEY (eventId) REFERENCES events(id)
    )`);

    console.log('Registrations table created');
});

// Opretter events tabellen hvis den ikke allerede eksisterer
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

    console.log('Events table created');
});

// Indsætter standard events hvis tabellen er tom
db.serialize(() => {
    console.log('Checking if standard events already exists');

    db.get(`SELECT COUNT(*) AS count FROM events`, (err, row) => {
        if (err) {
            console.error('Error counting events:', err);
            return;
        }

        // Hvis der ikke er nogle events i tabellen, indsæt standard events
        if (row.count === 0) {
            console.log("Inserting default events...");

            // Opretter et array af standard events
            const events = [
                {
                    title: 'Coordinated Shopping Tour in Ringsted Designer Outlet',
                    date: '2025-07-07',
                    description: 'Join us for a fun shopping tour at Ringsted Designer Outlet with exclusive discounts and group activities.',
                    price: 500,
                    imageUrl: 'https://res.cloudinary.com/dkbezala8/image/upload/f_auto/image1_zue0cr?_a=BAMAMiRj0'
                },
                {
                    title: 'Visit the Brassknuckle in Ballerup',
                    date: '2026-05-05',
                    description: 'Join us for an exciting visit to the Brassknuckle venue in Ballerup for live music and entertainment.',
                    price: 350,
                    imageUrl: 'https://res.cloudinary.com/dkbezala8/image/upload/f_auto/image2_hj1ez1?_a=BAMAMiRj0'
                },
                {
                    title: 'Marathon from Ringsted to Ballerup backwards',
                    date: '2026-10-10',
                    description: 'Challenge yourself in our unique marathon running backwards from Ringsted to Ballerup!',
                    price: 150,
                    imageUrl: 'https://res.cloudinary.com/dkbezala8/image/upload/f_auto/image7_lc1tdd?_a=BAMAMiRj0'
                },
                {
                    title: 'Lucas Knudsen Pop-up Concert',
                    date: '2026-10-05',
                    description: 'Enjoy an intimate pop-up concert featuring Lucas Knudsen performing his latest hits.',
                    price: 25,
                    imageUrl: 'https://res.cloudinary.com/dkbezala8/image/upload/f_auto/image9_xtrx5r?_a=BAMAMiRj0'
                },
                {
                    title: 'LAN-Party at Solbjerg Plads',
                    date: '2025-11-20',
                    description: 'Bring your computer and join us for a fun LAN-party at Solbjerg Plads with gaming, food, and prizes!',
                    price: 25,
                    imageUrl: 'https://res.cloudinary.com/dkbezala8/image/upload/f_auto/image5_rtglh2?_a=BAMAMiRj0'
                },
                {
                    title: 'Clover Hunt in Fælledparken',
                    date: '2025-12-31',
                    description: 'Join us for a fun clover hunting event in Fælledparken and see who can find the most clovers!',
                    price: 900,
                    imageUrl: 'https://res.cloudinary.com/dkbezala8/image/upload/f_auto/image6_fqaysd?_a=BAMAMiRj0'
                },
                {
                    title: 'Microsoft Datacenter Tour',
                    date: '2025-01-10',
                    description: 'Experience a behind-the-scenes tour of a Microsoft Datacenter and learn about cloud computing infrastructure.',
                    price: 420,
                    imageUrl: 'https://res.cloudinary.com/dkbezala8/image/upload/f_auto/image4_y72k6a?_a=BAMAMiRj0'
                },
                {
                    title: 'Counter-Strike Source',
                    date: '2025-12-12',
                    description: 'Join us for an exciting gaming event featuring Counter-Strike Source tournaments and activities.',
                    price: 67,
                    imageUrl: 'https://res.cloudinary.com/dkbezala8/image/upload/f_auto/image8_smw3k0?_a=BAMAMiRj0'
                }
            ];

            // Forbereder sql sætning til indsættelse af events
            const stmt = db.prepare(`
                INSERT INTO events (title, date, description, price, imageUrl)
                VALUES (?, ?, ?, ?, ?)
            `);

            // Løber gennem events arrayet og indsætter hver event i databasen
            events.forEach(event => {
                stmt.run(event.title, event.date, event.description, event.price, event.imageUrl);
            });

            // Finaliserer sql sætningen
            stmt.finalize(() => {
                console.log("Default events inserted successfully.");
            });
        } else {
            console.log(`Events already exist`); //Hvis der allerede er events
        }
    });
});


module.exports = db;