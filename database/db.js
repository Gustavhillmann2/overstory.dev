const path = require('path');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(path.join(__dirname, 'mydb.sqlite'));

// Opretter en tabel, hvis den ikke allerede findes
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

// Brugere
const users = [
    { username: 'gustav', email: 'gustav@example.com', password: 'password1' },
];


// Funktion til at oprette bruger
db.serialize(() => {
    const dbStatement = db.prepare('INSERT INTO users (username, email, password) VALUES (?, ?, ?)');
    users.forEach(user => {
        dbStatement.run(user.username, user.email, user.password, (err) => {
            if (err) {
                console.error(`Failed to insert ${user.username}:`, err);
            }
        });
    });
    dbStatement.finalize(err => {   
        if (err) {
            console.error('Error finalizing statement:', err);
        } else {
            console.log('All users inserted successfully');
        }
    });
});

db.close();