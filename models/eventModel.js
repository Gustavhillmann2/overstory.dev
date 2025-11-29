const db = require('../database/db');

class EventModel {
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
		})
	};

	// static getEvents() {
	// 	return new Promise((resolve, reject) => {
	// 		const sql = `SELECT * FROM events`;

	// 		db.all(sql, [], (err, rows) => {
	// 			if (err) {
	// 				return reject(err);
	// 			}
	// 			resolve(rows);
	// 		});
	// 	})
	// }

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
		})
	}

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
				if (err) return reject(err);
				resolve(rows);
			});
		});
	}	
}

module.exports = EventModel;