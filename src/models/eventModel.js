const db = require('../database/db'); // Importer database forbindelse

// EventModel klasse til at håndtere event relaterede database operationer
class EventModel {
	// Opret et nyt event i databasen
	static createEvent(title, date, description, price, imageUrl) {
		return new Promise((resolve, reject) => {
			const sql = `
				INSERT INTO events (title, date, description, price, imageUrl)
				VALUES (?, ?, ?, ?, ?)
			`

			db.run(sql, [title, date, description, price, imageUrl], function (err) {
				if (err) {
					return reject(err);
				}
				resolve({ id: this.lastID, title, date, description, price, imageUrl });
			});
		});
	};

	// Registrer en bruger til et event
	static registerEvent(userId, eventId) {
		return new Promise((resolve, reject) => {
			const sql = `
				INSERT INTO registrations (userId, eventId)
				VALUES (?, ?)
			`

			db.run(sql, [userId, eventId], function (err) {
				if (err) {
					return reject(err);
				}
				resolve({ id: this.lastID, userId, eventId });
			});
		});
	};

	// Hent alle events med registreringsstatus for en given bruger
	static getEvents(userId) {
		return new Promise((resolve, reject) => {
			const sql = `
				SELECT 
					e.*,
					CASE 
						WHEN r.userId IS NOT NULL THEN 1 
						ELSE 0 
					END AS isRegistered
				FROM events e
				LEFT JOIN registrations r
					ON e.id = r.eventId
					AND r.userId = ?
				ORDER BY e.date ASC
			`;
	
			db.all(sql, [userId], (err, rows) => {
				if (err) {
					return reject(err);
				}
				resolve(rows);
			});
		});
	};

	static getEventById(id) {
		return new Promise((resolve, reject) => {
			const sql = `SELECT * FROM events WHERE id = ?`;
	
			db.get(sql, [id], (err, row) => {
				if (err) {
					return reject(err);	
				}
				resolve(row);
			});
		});
	};
};

module.exports = EventModel;